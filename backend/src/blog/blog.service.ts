import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { Repository } from 'typeorm';
import { slugify } from 'src/utils/slugify';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  findAll(page: number = 1, limit: number = 10): Promise<Blog[]> {
    return this.blogRepository.find({
      where: { isDeleted: false },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(slug: string): Promise<Blog> {
    const blog = await this.blogRepository.findOne({
      where: { slug, isDeleted: false },
    });

    if (!blog) {
      throw new NotFoundException(`Blog dengan slug ${slug} tidak ditemukan`);
    }

    return blog;
  }

  create(title: string, content: string): Promise<Blog> {
    const blog = this.blogRepository.create({ title, content });
    return this.blogRepository.save(blog);
  }

  async update(slug: string, title: string, content: string): Promise<Blog> {
    const blog = await this.findOne(slug);
    await this.blogRepository.update(blog.id, {
      title,
      content,
      slug: slugify(title),
    });
    return this.findOne(slugify(title));
  }

  async delete(slug: string): Promise<void> {
    const blog = await this.findOne(slug);
    await this.blogRepository.update(blog.id, { isDeleted: true });
  }
}
