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

@Controller('our-service')
export class OurServiceController {
  constructor(private readonly ourServiceService: OurServiceService) {}

  @Get()
  findAll() {
    return this.ourServiceService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: OurServiceDto) {
    return this.ourServiceService.create(data.title, data.description);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: OurServiceDto) {
    return this.ourServiceService.update(+id, data.title, data.description);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/toggle')
  toggleActive(@Param('id') id: string) {
    return this.ourServiceService.toggleActive(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ourServiceService.delete(+id);
  }
}
