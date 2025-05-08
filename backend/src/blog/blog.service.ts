import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { Repository } from 'typeorm';
import { slugify } from 'src/utils/slugify';
import { Users } from 'src/users/users.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  findAll(page: number = 1, limit: number = 10): Promise<Blog[]> {
    return this.blogRepository.find({
      relations: ['author'],
      select: {
        id: true,
        title: true,
        content: true,
        publishedAt: true,
        slug: true,
        author: {
          username: true,
        },
      },
      where: { isDeleted: false },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(slug: string): Promise<Blog> {
    const blog = await this.blogRepository.findOne({
      where: { slug, isDeleted: false },
      relations: ['author'],
      select: {
        id: true,
        title: true,
        content: true,
        publishedAt: true,
        slug: true,
        author: {
          username: true,
        },
      },
    });

    if (!blog) {
      throw new NotFoundException(`Blog dengan slug ${slug} tidak ditemukan`);
    }

    return blog;
  }

  async findByAuthor(
    userId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<Blog[]> {
    return this.blogRepository.find({
      where: { author: { id: userId }, isDeleted: false },
      relations: ['author'],
      select: {
        id: true,
        title: true,
        content: true,
        publishedAt: true,
        slug: true,
        author: {
          username: true,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async create(
    title: string,
    content: string,
    authorId: number,
  ): Promise<Blog> {
    const author = await this.usersRepository.findOne({
      where: { id: authorId },
    });

    if (!author) {
      throw new NotFoundException(
        `Author dengan ID ${authorId} tidak ditemukan`,
      ); // Handle the case where the author is not found
    }

    const blog = this.blogRepository.create({
      title,
      content,
      author,
      slug: slugify(title),
    });

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
