import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResponseHelper } from 'src/utils/response.helper';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // Cari user berdasarkan username dan validasi password
    const user = await this.userService.validateUserPassword(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      return ResponseHelper.error(401, 'Invalid Credentials');
    }

    const jwt = this.authService.generateJwt(user);

    res.cookie('token', jwt.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Generate JWT jika user valid
    return ResponseHelper.success({ message: 'Login successfull' });
  }

  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    // Cek apakah user sudah ada
    const existingUser = await this.userService.findByUsername(
      registerDto.email,
    );
    if (existingUser) {
      return ResponseHelper.error(409); // Atau lempar exception yang sesuai
    }

    // Buat user baru
    const newUser = await this.userService.createUser(
      registerDto.email,
      registerDto.username,
      registerDto.password,
    );

    // Generate JWT untuk user baru
    return ResponseHelper.success(this.authService.generateJwt(newUser), 201);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return ResponseHelper.success({ message: 'Logged out successfully' });
  }
}
