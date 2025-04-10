import { Module } from '@nestjs/common';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faq } from './faq.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Faq])],
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}
