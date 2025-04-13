import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockCompanyRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
});

describe('CompanyService', () => {
  let service: CompanyService;
  let repo: ReturnType<typeof mockCompanyRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(Company),
          useFactory: mockCompanyRepository,
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    repo = module.get(getRepositoryToken(Company));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return array of companys', async () => {
    const mockCompanys = [
      {
        name: 'company 1',
        slogan: 'slogan company 1',
        about: 'about company 1',
        email: 'email1@example.com',
        phone: '081234567890',
      },
      {
        name: 'company 2',
        slogan: 'slogan company 2',
        about: 'about company 2',
        email: 'email2@example.com',
        phone: '081209876543',
      },
    ] as Company[];
    repo.find.mockReturnValueOnce(mockCompanys);

    const result = await service.findAll();

    expect(repo.find).toHaveBeenCalled();

    expect(result).toEqual(mockCompanys);
  });

  it('should return one company by id', async () => {
    const company = { id: 1, name: 'this is a company name' } as Company;
    repo.findOne.mockResolvedValue(company);

    const result = await service.findOne(1);

    expect(repo.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(company);
  });

  it('should create and save a company info', async () => {
    const data = {
      name: 'company 2',
      slogan: 'slogan company 2',
      about: 'about company 2',
      email: 'email2@example.com',
      phone: '081209876543',
    };
    const mockCompany = { ...data } as Company;

    repo.create.mockReturnValue(mockCompany);
    repo.save.mockResolvedValue(mockCompany);

    const result = await service.create(
      data.name,
      data.slogan,
      data.about,
      data.email,
      data.phone,
    );

    expect(repo.create).toHaveBeenCalledWith(data);
    expect(repo.save).toHaveBeenCalledWith(mockCompany);
    expect(result).toEqual(mockCompany);
  });
});
