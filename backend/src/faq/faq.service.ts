import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from './faq.entity';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq)
    private faqRepository: Repository<Faq>,
  ) {}

  findAll(): Promise<Faq[]> {
    return this.faqRepository.find({
      order: { id: 'ASC' },
      where: {
        isActive: true,
      },
    });
  }

  async findOne(id: number): Promise<Faq> {
    const res = await this.faqRepository.findOne({
      where: { id },
    });

    if (!res) {
      throw new NotFoundException(`Faq dengan id ${id} tidak ditemukan`);
    }

    return res;
  }

  //add
  create(question: string, answer: string): Promise<Faq> {
    const temp = this.faqRepository.create({ question, answer });
    return this.faqRepository.save(temp);
  }

  //update
  async update(id: number, question: string, answer: string): Promise<Faq> {
    const faq = await this.findOne(id);

    await this.faqRepository.update(faq.id, {
      question,
      answer,
    });

    return this.findOne(id);
  }

  //buat set tampil / tidak
  async toggleActive(id: number): Promise<void> {
    const item = await this.findOne(id);
    item.isActive = !item.isActive;
    await this.faqRepository.save(item);
  }

  //delete
  async delete(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.faqRepository.delete(item.id);
  }
}
