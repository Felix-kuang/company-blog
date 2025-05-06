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
  Request,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDto } from './dto/blog.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResponseHelper } from 'src/utils/response.helper';
import { User } from 'src/interface/user';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async findBlogs(
    @Query('authorId') authorId?: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    if (authorId) {
      return ResponseHelper.success(
        await this.blogService.findByAuthor(authorId, page, limit),
      );
    }
    return ResponseHelper.success(await this.blogService.findAll(page, limit));
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return ResponseHelper.success(await this.blogService.findOne(slug));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: BlogDto, @Request() req) {
    const author = req as User;
    return ResponseHelper.success(
      await this.blogService.create(body.title, body.content, author.id),
      201,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':slug')
  async update(@Param('slug') slug: string, @Body() body: BlogDto) {
    return ResponseHelper.success(
      await this.blogService.update(slug, body.title, body.content),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':slug')
  async delete(@Param('slug') slug: string) {
    return ResponseHelper.success(await this.blogService.delete(slug));
  }
}
