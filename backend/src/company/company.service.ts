import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  findAll(): Promise<Company[]> {
    return this.companyRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Company> {
    const res = await this.companyRepository.findOne({ where: { id: id } });

    if (!res)
      throw new NotFoundException(`Company dengan id ${id} tidak ditemukan`);

    return res;
  }

  create(
    name: string,
    slogan: string,
    about: string,
    email: string,
    phone: string,
  ): Promise<Company> {
    const newCompany = this.companyRepository.create({
      name,
      slogan,
      about,
      email,
      phone,
    });
    return this.companyRepository.save(newCompany);
  }

  async update(
    id: number,
    name: string,
    slogan: string,
    about: string,
    email: string,
    phone: string,
  ): Promise<Company> {
    const existingCompany = await this.findOne(id);

    await this.companyRepository.update(existingCompany.id, {
      name,
      slogan,
      about,
      email,
      phone,
    });

    return this.findOne(id);
  }
}
