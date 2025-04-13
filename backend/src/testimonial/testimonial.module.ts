import { Module } from '@nestjs/common';
import { TestimonialController } from './testimonial.controller';
import { TestimonialService } from './testimonial.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testimonial } from './testimonial.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Testimonial]), AuthModule],
  controllers: [TestimonialController],
  providers: [TestimonialService],
})
export class TestimonialModule {}
