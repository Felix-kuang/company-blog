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
import { TestimonialService } from './testimonial.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TestimonialDto } from './dto/testimonial.dto';

@Controller('testimonial')
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}

  @Get()
  findAll() {
    return this.testimonialService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: TestimonialDto) {
    return this.testimonialService.create(data.name, data.testimony);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: TestimonialDto) {
    return this.testimonialService.update(+id, data.name, data.testimony);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/toggle')
  toggleActive(@Param('id') id: string) {
    return this.testimonialService.toggleActive(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.testimonialService.delete(+id);
  }
}
