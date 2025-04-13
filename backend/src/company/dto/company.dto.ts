import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CompanyDto {
  @IsString()
  name: string;

  @IsString()
  slogan: string;

  @IsString()
  about: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsPhoneNumber('ID')
  phone: string;
}
