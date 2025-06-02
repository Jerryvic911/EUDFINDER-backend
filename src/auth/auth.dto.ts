import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}

export class LoginAdminDto {
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
