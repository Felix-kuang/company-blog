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

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  findAll() {
    return this.faqService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: FaqDto) {
    return this.faqService.create(data.question, data.answer);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: FaqDto) {
    return this.faqService.update(+id, data.question, data.answer);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/toggle')
  toggleActive(@Param('id') id: string) {
    return this.faqService.toggleActive(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.faqService.delete(+id);
  }
}
