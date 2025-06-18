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
    const cleanedName = name.trim();
    return this.schoolModel.find({ name: new RegExp(cleanedName, 'i') }).exec();
  }

  async searchByLocation(location: string): Promise<School[]> {
    const cleanedLocation = location.trim();
    return this.schoolModel
      .find({ location: new RegExp(cleanedLocation, 'i') })
      .exec();
  }

  async searchByCourse(courseName: string): Promise<School[]> {
    const cleanedCourse = courseName.trim();
    return this.schoolModel
      .find({ courses: { $regex: new RegExp(cleanedCourse, 'i') } })
      .exec();
  }
  async searchByScore(score: string): Promise<School[]> {
    const numericScore = Number(score.trim());
    if (isNaN(numericScore)) {
      return []; // or throw error
    }
    return this.schoolModel
      .find({ cutOffMark: { $gte: numericScore } })
      .sort({ cutOffMark: -1 })
      .exec();
  }

  // school.service.ts
  async update(id: string, updateDto: CreateSchoolDto) {
    return this.schoolModel.findByIdAndUpdate(id, updateDto, { new: true });
  }

  async remove(id: string) {
    return this.schoolModel.findByIdAndDelete(id);
  }

  async deleteAll() {
    return this.schoolModel.deleteMany({});
  }
}
