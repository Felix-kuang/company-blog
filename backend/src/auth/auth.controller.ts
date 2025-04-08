import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // Cari user berdasarkan username dan validasi password
    const user = await this.userService.validateUserPassword(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new Error('Invalid credentials'); // Atau lempar exception yang sesuai
    }

    // Generate JWT jika user valid
    return this.authService.generateJwt(user);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    // Cek apakah user sudah ada
    const existingUser = await this.userService.findByUsername(
      registerDto.email,
    );
    if (existingUser) {
      throw new Error('User already exists'); // Atau lempar exception yang sesuai
    }

    // Buat user baru
    const newUser = await this.userService.createUser(
      registerDto.email,
      registerDto.username,
      registerDto.password,
    );

    // Generate JWT untuk user baru
    return this.authService.generateJwt(newUser);
  }
}
