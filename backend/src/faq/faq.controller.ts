import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FaqService } from './faq.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FaqDto } from './dto/faq.dto';
import { ResponseHelper } from 'src/utils/response.helper';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  async findAll() {
    return ResponseHelper.success(await this.faqService.findAll());
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: FaqDto) {
    return ResponseHelper.success(
      await this.faqService.create(data.question, data.answer),
      201,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: FaqDto) {
    return ResponseHelper.success(
      await this.faqService.update(+id, data.question, data.answer),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/toggle')
  async toggleActive(@Param('id') id: string) {
    return ResponseHelper.success(await this.faqService.toggleActive(+id));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return ResponseHelper.success(await this.faqService.delete(+id));
  }
}
