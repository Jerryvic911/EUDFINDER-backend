import {
  IsBoolean,
  IsNumber,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class AccommodationDto {
  @IsNumber()
  hostel: number;

  @IsNumber()
  feeding: number;
}

export class CreateSchoolDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsBoolean()
  hasPostUtme: boolean;

  @IsNumber()
  @Type(() => Number)
  cutOffMark: number;

  @IsNumber()
  schoolFees: number;

  @IsString()
  aboutSchool: string;

  @ValidateNested({ each: true }) // If accommodation can be an array, add { each: true }
  @Type(() => AccommodationDto)
  accommodation: AccommodationDto; // or AccommodationDto[] if it can be an array

  @IsArray()
  @IsString({ each: true })
  courses: string[];
}
