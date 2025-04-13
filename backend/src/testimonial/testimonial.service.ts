import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Testimonial } from './testimonial.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestimonialService {
  constructor(
    @InjectRepository(Testimonial)
    private testimonialRepository: Repository<Testimonial>,
  ) {}

  findAll(): Promise<Testimonial[]> {
    return this.testimonialRepository.find({
      order: { id: 'ASC' },
      where: { isActive: true },
    });
  }

  async findOne(id: number): Promise<Testimonial> {
    const res = await this.testimonialRepository.findOne({
      where: { id: id },
    });

    if (!res) {
      throw new NotFoundException(`Testimoni dengan id ${id} tidak ditemukan`);
    }

    return res;
  }

  create(name: string, testimony: string): Promise<Testimonial> {
    const newTestimony = this.testimonialRepository.create({ name, testimony });
    return this.testimonialRepository.save(newTestimony);
  }

  async update(
    id: number,
    name: string,
    testimony: string,
  ): Promise<Testimonial> {
    const existingTestimony = await this.findOne(id);

    await this.testimonialRepository.update(existingTestimony.id, {
      name,
      testimony,
    });

    return this.findOne(id);
  }

  async toggleActive(id: number) {
    const testimony = await this.findOne(id);
    testimony.isActive = !testimony.isActive;
    return this.testimonialRepository.save(testimony);
  }

  async delete(id: number) {
    const testimony = await this.findOne(id);
    await this.testimonialRepository.delete(testimony);
  }
}
