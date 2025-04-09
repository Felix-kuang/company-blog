import { Module } from '@nestjs/common';
import { OurServiceController } from './our-service.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OurService } from './our-service.entity';
import { OurServiceService } from './our-service.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([OurService])],
  providers: [OurServiceService],
  controllers: [OurServiceController],
})
export class OurServiceModule {}
