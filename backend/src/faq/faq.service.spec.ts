import { Test, TestingModule } from '@nestjs/testing';
import { FaqService } from './faq.service';
import { Faq } from './faq.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockFaqRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

describe('FaqService', () => {
  let service: FaqService;
  let repo: ReturnType<typeof mockFaqRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FaqService,
        { provide: getRepositoryToken(Faq), useFactory: mockFaqRepository },
      ],
    }).compile();
    service = module.get<FaqService>(FaqService);
    repo = module.get(getRepositoryToken(Faq));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return array of faqs', async () => {
    const mockFaqs = [
      { question: 'first question', answer: 'first question' },
      { question: 'second question', answer: 'second question' },
    ] as Faq[];
    repo.find.mockReturnValueOnce(mockFaqs);

    const result = await service.findAll();

    expect(repo.find).toHaveBeenCalled();

    expect(result).toEqual(mockFaqs);
  });

  it('should return one faq by id', async () => {
    const faq = { id: 1, question: 'this is a question' } as Faq;
    repo.findOne.mockResolvedValue(faq);

    const result = await service.findOne(1);

    expect(repo.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(faq);
  });

  it('should create and save a new faq', async () => {
    const data = { question: 'Test', answer: 'content' };
    const mockFaq = { ...data } as Faq;

    repo.create.mockReturnValue(mockFaq);
    repo.save.mockResolvedValue(mockFaq);

    const result = await service.create(data.question, data.answer);

    expect(repo.create).toHaveBeenCalledWith(data);
    expect(repo.save).toHaveBeenCalledWith(mockFaq);
    expect(result).toEqual(mockFaq);
  });

  it('should toggle isActive of a faq', async () => {
    const faq = {
      id: 1,
      question: 'faq to be disabled',
      isActive: true,
    } as Faq;
    repo.findOne.mockResolvedValue(faq);
    repo.save.mockResolvedValue(faq);

    await service.toggleActive(1);

    expect(repo.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        question: 'faq to be disabled',
        isActive: false,
      }),
    );
  });
});
