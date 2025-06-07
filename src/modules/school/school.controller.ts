import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
  Put,
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './school.dto';
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

  // 🟡 Update school (Admins only)
  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateDto: CreateSchoolDto) {
    return this.schoolService.update(id, updateDto);
  }

  // 🔴 Delete school (Admins only)
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.schoolService.remove(id);
  }

  @Get()
  findAll() {
    return this.schoolService.findAll();
  }

  @Get('search/name/:name')
  search(@Param('name') name: string) {
    return this.schoolService.searchByName(name);
  }

  // 🔍 Search by location
  @Get('search/location/:location')
  searchByLocation(@Param('location') location: string) {
    return this.schoolService.searchByLocation(location);
  }

  // 🔍 Search by course
  @Get('search/course/:course')
  searchByCourse(@Param('course') course: string) {
    return this.schoolService.searchByCourse(course);
  }
  @Get('search/score/:score')
  searchByScore(@Param('score') score: string) {
    return this.schoolService.searchByScore(score);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.schoolService.findById(id);
  }
}
