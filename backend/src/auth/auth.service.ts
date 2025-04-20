import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/users.entity';
import { JwtPayload } from './auth.payload';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateJwt(user: Users) {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET || 'defaultSecret',
      }),
    };
  }
}
