import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { NotFoundException } from '@nestjs/common/exceptions';

const mockBlogRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
});

describe('BlogService', () => {
  let service: BlogService;
  let repo: ReturnType<typeof mockBlogRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        { provide: getRepositoryToken(Blog), useFactory: mockBlogRepository },
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
    const data = { title: 'Test', content: 'content' };
    const mockBlog = { ...data } as Blog;

    repo.create.mockReturnValue(mockBlog);
    repo.save.mockResolvedValue(mockBlog);

    const result = await service.create(data.title, data.content);

    expect(repo.create).toHaveBeenCalledWith(data);
    expect(repo.save).toHaveBeenCalledWith(mockBlog);
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
