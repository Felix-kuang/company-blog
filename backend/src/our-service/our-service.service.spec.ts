import { Test, TestingModule } from '@nestjs/testing';
import { OurServiceService } from './our-service.service';
import { OurService } from './our-service.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockOurServiceRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

describe('OurServiceService', () => {
  let service: OurServiceService;
  let repo: ReturnType<typeof mockOurServiceRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OurServiceService,
        {
          provide: getRepositoryToken(OurService),
          useFactory: mockOurServiceRepository,
        },
      ],
    }).compile();
    service = module.get<OurServiceService>(OurServiceService);
    repo = module.get(getRepositoryToken(OurService));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return array of ourServices', async () => {
    const mockOurServices = [
      { title: 'first service', description: 'first description of service' },
      { title: 'second service', description: 'second description of service' },
    ] as OurService[];
    repo.find.mockReturnValueOnce(mockOurServices);

    const result = await service.findAll();

    expect(repo.find).toHaveBeenCalled();

    expect(result).toEqual(mockOurServices);
  });

  it('should return one ourService by id', async () => {
    const ourService = { id: 1, title: 'this is a service name' } as OurService;
    repo.findOne.mockResolvedValue(ourService);

    const result = await service.findOne(1);

    expect(repo.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(ourService);
  });

  it('should create and save a new ourService', async () => {
    const data = { title: 'Test', description: 'content' };
    const mockOurService = { ...data } as OurService;

    repo.create.mockReturnValue(mockOurService);
    repo.save.mockResolvedValue(mockOurService);

    const result = await service.create(data.title, data.description);

    expect(repo.create).toHaveBeenCalledWith(data);
    expect(repo.save).toHaveBeenCalledWith(mockOurService);
    expect(result).toEqual(mockOurService);
  });

  it('should toggle isActive of a ourService', async () => {
    const ourService = {
      id: 1,
      title: 'Service to be disabled',
      isActive: true,
    } as OurService;
    repo.findOne.mockResolvedValue(ourService);
    repo.save.mockResolvedValue(ourService);

    await service.toggleActive(1);

    expect(repo.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        title: 'Service to be disabled',
        isActive: false,
      }),
    );
  });
});
