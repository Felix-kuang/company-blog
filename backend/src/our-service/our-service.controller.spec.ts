import { Test, TestingModule } from '@nestjs/testing';
import { OurServiceController } from './our-service.controller';

describe('OurServiceController', () => {
  let controller: OurServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OurServiceController],
    }).compile();

    controller = module.get<OurServiceController>(OurServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
