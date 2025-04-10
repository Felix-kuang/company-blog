import { IsNotEmpty, IsString } from 'class-validator';

export class FaqDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}
