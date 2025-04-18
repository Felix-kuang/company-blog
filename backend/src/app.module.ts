import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FaqModule } from './faq/faq.module';
import { TestimonialModule } from './testimonial/testimonial.module';
import { OurServiceModule } from './our-service/our-service.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'password',
      database: process.env.DB_NAME || 'mydatabase',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BlogModule,
    UsersModule,
    AuthModule,
    FaqModule,
    TestimonialModule,
    OurServiceModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
