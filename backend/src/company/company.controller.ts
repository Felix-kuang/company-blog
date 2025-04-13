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

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: CompanyDto) {
    return this.companyService.create(
      data.name,
      data.slogan,
      data.about,
      data.email,
      data.phone,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: CompanyDto) {
    return this.companyService.update(
      +id,
      data.name,
      data.slogan,
      data.about,
      data.email,
      data.phone,
    );
  }
}
