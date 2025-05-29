import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSchoolDto } from './school.dto';
import { School } from './entities/school.schema';

@Injectable()
export class SchoolService {
  constructor(@InjectModel(School.name) private schoolModel: Model<School>) {}

  async create(createSchoolDto: CreateSchoolDto): Promise<School> {
    const school = new this.schoolModel(createSchoolDto);
    return school.save();
  }

  async findAll(): Promise<School[]> {
    return this.schoolModel.find().exec();
  }

  async findById(id: string): Promise<School | null> {
    return this.schoolModel.findById(id).exec();
  }

  async searchByName(name: string): Promise<School[]> {
    return this.schoolModel.find({ name: new RegExp(name, 'i') }).exec();
  }
}
