import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { School } from './entities/school.schema';

@Injectable()
export class SchoolService {
  constructor(@InjectModel(School.name) private model: Model<School>) {}

  findAll() {
    return this.model.find().exec();
  }

  findById(id: string) {
    return this.model.findById(id).exec();
  }

  create(data: Partial<School>) {
    const school = new this.model(data);
    return school.save();
  }
}
