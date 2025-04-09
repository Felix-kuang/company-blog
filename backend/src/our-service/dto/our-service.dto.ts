import { IsNotEmpty, IsString } from 'class-validator';

export class OurServiceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
