import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SchoolService } from './school.service';
import { School } from './entities/school.schema';

@Controller('schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get()
  findAll(): Promise<School[]> {
    return this.schoolService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<School | null> {
    return this.schoolService.findById(id);
  }

  @Post()
  create(@Body() data: Partial<School>): Promise<School> {
    return this.schoolService.create(data);
  }
}
