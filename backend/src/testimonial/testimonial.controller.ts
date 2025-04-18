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
import { ResponseHelper } from 'src/utils/response.helper';

@Controller('testimonial')
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}

  @Get()
  async findAll() {
    return ResponseHelper.success(await this.testimonialService.findAll());
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: TestimonialDto) {
    return ResponseHelper.success(
      await this.testimonialService.create(data.name, data.testimony),
      201,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: TestimonialDto) {
    return ResponseHelper.success(
      await this.testimonialService.update(+id, data.name, data.testimony),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/toggle')
  async toggleActive(@Param('id') id: string) {
    return ResponseHelper.success(
      await this.testimonialService.toggleActive(+id),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return ResponseHelper.success(await this.testimonialService.delete(+id));
  }
}
