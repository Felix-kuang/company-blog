import {
  Body,
  Controller,
  Put,
  Get,
  Param,
  Post,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OurServiceService } from './our-service.service';
import { OurServiceDto } from './dto/our-service.dto';
import { ResponseHelper } from 'src/utils/response.helper';

@Controller('our-service')
export class OurServiceController {
  constructor(private readonly ourServiceService: OurServiceService) {}

  @Get()
  async findAll() {
    return ResponseHelper.success(await this.ourServiceService.findAll());
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: OurServiceDto) {
    return ResponseHelper.success(
      await this.ourServiceService.create(data.title, data.description),
      201,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: OurServiceDto) {
    return ResponseHelper.success(
      await this.ourServiceService.update(+id, data.title, data.description),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/toggle')
  async toggleActive(@Param('id') id: string) {
    return ResponseHelper.success(
      await this.ourServiceService.toggleActive(+id),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return ResponseHelper.success(await this.ourServiceService.delete(+id));
  }
}
