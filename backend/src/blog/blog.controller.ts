import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDto } from './dto/blog.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.blogService.findAll(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: BlogDto) {
    return this.blogService.create(body.title, body.content);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':slug')
  update(@Param('slug') slug: string, @Body() body: BlogDto) {
    return this.blogService.update(slug, body.title, body.content);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':slug')
  delete(@Param('slug') slug: string) {
    return this.blogService.delete(slug);
  }
}
