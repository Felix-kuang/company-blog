import { IsNotEmpty, IsString } from 'class-validator';

export class TestimonialDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  testimony: string;
}
