import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async findByUsername(email: string): Promise<Users | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // Validasi password user (untuk login)
  async validateUserPassword(
    email: string,
    password: string,
  ): Promise<Users | null> {
    const user = await this.findByUsername(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  // Fungsi untuk membuat user baru
  async createUser(
    email: string,
    username: string,
    password: string,
  ): Promise<Users> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      email,
      username,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }
}
