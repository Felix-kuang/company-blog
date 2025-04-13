import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OurService } from './our-service.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OurServiceService {
  constructor(
    @InjectRepository(OurService)
    private ourServiceRepository: Repository<OurService>,
  ) {}

  findAll(): Promise<OurService[]> {
    return this.ourServiceRepository.find({
      order: { id: 'ASC' },
      where: { isActive: true },
    });
  }

  async findOne(id: number): Promise<OurService> {
    const res = await this.ourServiceRepository.findOne({
      where: { id },
    });

    if (!res) {
      throw new NotFoundException(`Service dengan id ${id} tidak ditemukan`);
    }

    return res;
  }

  //add
  create(title: string, description: string): Promise<OurService> {
    const temp = this.ourServiceRepository.create({ title, description });
    return this.ourServiceRepository.save(temp);
  }

  //update
  async update(
    id: number,
    title: string,
    description: string,
  ): Promise<OurService> {
    const ourService = await this.findOne(id);

    await this.ourServiceRepository.update(ourService.id, {
      title,
      description,
    });

    return this.findOne(id);
  }

  //buat set tampil / tidak
  async toggleActive(id: number): Promise<void> {
    const item = await this.findOne(id);
    item.isActive = !item.isActive;
    await this.ourServiceRepository.save(item);
  }

  //delete
  async delete(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.ourServiceRepository.delete(item.id);
  }
}
