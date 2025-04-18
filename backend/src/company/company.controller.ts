import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CompanyDto } from './dto/company.dto';
import { ResponseHelper } from 'src/utils/response.helper';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return ResponseHelper.success(await this.companyService.findOne(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CompanyDto) {
    return ResponseHelper.success(
      await this.companyService.create(
        data.name,
        data.slogan || '',
        data.about || '',
        data.email || '',
        data.phone || '',
      ),
      201,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CompanyDto) {
    return ResponseHelper.success(
      await this.companyService.update(
        +id,
        data.name,
        data.slogan || '',
        data.about || '',
        data.email || '',
        data.phone || '',
      ),
    );
  }
}
