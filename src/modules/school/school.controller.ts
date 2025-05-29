import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './school.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto);
  }

  @Get()
  findAll() {
    return this.schoolService.findAll();
  }

  @Get('search/:name')
  search(@Param('name') name: string) {
    return this.schoolService.searchByName(name);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.schoolService.findById(id);
  }
}
