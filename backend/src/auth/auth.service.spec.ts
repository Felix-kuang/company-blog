import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/users.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked-jwt-token'),
          },
        },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should generate JWT token with correct payload', () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
    } as Users;

    const result = authService.generateJwt(mockUser);

    const signSpy = jest.spyOn(jwtService, 'sign');
    expect(signSpy).toHaveBeenCalledWith(
      { username: 'testuser', sub: 1 },
      expect.any(Object),
    );

    expect(result).toEqual({
      access_token: 'mocked-jwt-token',
    });
  });
});
