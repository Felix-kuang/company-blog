import { Test, TestingModule } from '@nestjs/testing';
import { TestimonialService } from './testimonial.service';
import { Testimonial } from './testimonial.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockTestimonialRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

describe('TestimonialService', () => {
  let service: TestimonialService;
  let repo: ReturnType<typeof mockTestimonialRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestimonialService,
        {
          provide: getRepositoryToken(Testimonial),
          useFactory: mockTestimonialRepository,
        },
      ],
    }).compile();
    service = module.get<TestimonialService>(TestimonialService);
    repo = module.get(getRepositoryToken(Testimonial));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return array of ourServices', async () => {
    const mockTestimonials = [
      { name: 'first service', testimony: 'first testimony of service' },
      { name: 'second service', testimony: 'second testimony of service' },
    ] as Testimonial[];
    repo.find.mockReturnValueOnce(mockTestimonials);

    const result = await service.findAll();

    expect(repo.find).toHaveBeenCalled();

    expect(result).toEqual(mockTestimonials);
  });

  it('should return one ourService by id', async () => {
    const ourService = { id: 1, name: 'this is a service name' } as Testimonial;
    repo.findOne.mockResolvedValue(ourService);

    const result = await service.findOne(1);

    expect(repo.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(ourService);
  });

  it('should create and save a new ourService', async () => {
    const data = { name: 'Test', testimony: 'content' };
    const mockTestimonial = { ...data } as Testimonial;

    repo.create.mockReturnValue(mockTestimonial);
    repo.save.mockResolvedValue(mockTestimonial);

    const result = await service.create(data.name, data.testimony);

    expect(repo.create).toHaveBeenCalledWith(data);
    expect(repo.save).toHaveBeenCalledWith(mockTestimonial);
    expect(result).toEqual(mockTestimonial);
  });

  it('should toggle isActive of a ourService', async () => {
    const ourService = {
      id: 1,
      name: 'Service to be disabled',
      isActive: true,
    } as Testimonial;
    repo.findOne.mockResolvedValue(ourService);
    repo.save.mockResolvedValue(ourService);

    await service.toggleActive(1);

    expect(repo.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        name: 'Service to be disabled',
        isActive: false,
      }),
    );
  });
});
