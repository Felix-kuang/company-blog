/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Users } from 'src/users/users.entity';

const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
});

describe('BlogService', () => {
  let service: BlogService;
  let repo: ReturnType<typeof mockRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        { provide: getRepositoryToken(Blog), useFactory: mockRepository },
        { provide: getRepositoryToken(Users), useFactory: mockRepository },
      ],
    }).compile();

    service = module.get<BlogService>(BlogService);
    repo = module.get(getRepositoryToken(Blog));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return array of blogs with pagination', async () => {
    const mockBlogs = [{ title: 'A' }, { title: 'B' }] as Blog[];
    repo.find.mockResolvedValue(mockBlogs);

    const result = await service.findAll(1, 2);

    expect(repo.find).toHaveBeenCalledWith({
      relations: ['author'],
      where: { isDeleted: false },
      skip: 0,
      take: 2,
    });

    expect(result).toEqual(mockBlogs);
  });

  it('should return blogs by the author', async () => {
    const userId = 1;
    const page = 1;
    const limit = 10;

    const mockBlogs = [
      { id: 1, title: 'Blog 1', content: 'Content 1', author: { id: userId } },
      { id: 2, title: 'Blog 2', content: 'Content 2', author: { id: userId } },
    ] as Blog[];

    // Mocking the find method of the BlogRepository
    repo.find = jest.fn().mockResolvedValue(mockBlogs);

    const result = await service.findByAuthor(userId, page, limit);

    // Verify the repository method was called with the correct arguments
    expect(repo.find).toHaveBeenCalledWith({
      where: { author: { id: userId }, isDeleted: false },
      relations: ['author'],
      skip: (page - 1) * limit,
      take: limit,
    });

    // Verify that the result is as expected
    expect(result).toEqual(mockBlogs);
  });

  it('should return one blog by slug', async () => {
    const blog = { slug: 'slug-title' } as Blog;
    repo.findOne.mockResolvedValue(blog);

    const result = await service.findOne('slug-title');

    expect(repo.findOne).toHaveBeenCalledWith({
      where: { slug: 'slug-title', isDeleted: false },
      relations: ['author'],
    });
    expect(result).toEqual(blog);
  });

  it('should throw NotFoundException if blog not found', async () => {
    repo.findOne.mockResolvedValue(null);

    await expect(service.findOne('missing')).rejects.toThrow(NotFoundException);
  });

  it('should create and save a new blog', async () => {
    // Mock Author data
    const mockAuthor = {
      id: 1,
      username: 'testUser',
      password: 'password',
      email: 'test@example.com',
    } as Users;

    // Blog data
    const data = { title: 'Test', content: 'content' };
    const mockBlog = { ...data, author: mockAuthor, slug: 'test' } as Blog;

    // Mock the Users repository to return the mockAuthor when finding by ID
    const mockUserRepository = {
      findOne: jest.fn().mockResolvedValue(mockAuthor), // Mock the findOne method
    };

    // Mock the Blog repository methods
    const mockBlogRepository = {
      create: jest.fn().mockReturnValue(mockBlog), // Mock create method
      save: jest.fn().mockResolvedValue(mockBlog), // Mock save method
    };

    // Inject mock repositories into the service (assuming these are the right names)
    const service = new BlogService(
      mockBlogRepository as any,
      mockUserRepository as any,
    );

    // Call the create method
    const result = await service.create(
      data.title,
      data.content,
      mockAuthor.id,
    );

    // Assertions
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { id: mockAuthor.id },
    });

    expect(mockBlogRepository.create).toHaveBeenCalledWith({
      title: data.title,
      content: data.content,
      author: mockAuthor,
      slug: 'test', // Ensure slug is correctly set (slugify is part of the logic)
    });

    expect(mockBlogRepository.save).toHaveBeenCalledWith(mockBlog);
    expect(result).toEqual(mockBlog);
  });

  it('should update a blog and return the updated one', async () => {
    const oldBlog = {
      id: 1,
      slug: 'old-blog-title',
    } as Blog;
    repo.findOne.mockResolvedValueOnce(oldBlog);
    repo.update.mockResolvedValueOnce(undefined);
    repo.findOne.mockResolvedValueOnce({
      ...oldBlog,
      slug: 'new-title',
    } as Blog);

    const result = await service.update('old-slug', 'New Title', 'new content');

    expect(repo.update).toHaveBeenCalledWith(oldBlog.id, {
      title: 'New Title',
      content: 'new content',
      slug: 'new-title',
    });
    expect(result.slug).toEqual('new-title');
  });

  it('should soft delete a blog', async () => {
    const blog = { id: 1, slug: 'to-delete' } as Blog;
    repo.findOne.mockResolvedValue(blog);
    repo.update.mockResolvedValue(undefined);

    await service.delete('to-delete');

    expect(repo.update).toHaveBeenCalledWith(blog.id, { isDeleted: true });
  });
});
