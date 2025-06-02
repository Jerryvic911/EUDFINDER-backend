import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../user/user.schema';
import { CreateAdminDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async registerAdmin(dto: CreateAdminDto): Promise<UserDocument> {
    console.log('DTO received:', dto);
    if (!dto.password || typeof dto.password !== 'string') {
      throw new ConflictException('Password is required and must be a string');
    }
    const existingUser = await this.userModel.findOne({ email: dto.email });
    if (existingUser) {
      throw new ConflictException('Admin already exists');
    }

    const hashedPassword = await this.hashPassword(dto.password);

    const admin = new this.userModel({
      email: dto.email,
      password: hashedPassword,
      role: 'admin',
    });

    return admin.save();
  }

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user: UserDocument | null = await this.userModel.findOne({ email });

    if (!user || !user.password || user.role !== 'admin') {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordValid = await this.comparePasswords(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  login(user: UserDocument) {
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      console.error('Hashing error:', error);
      throw new InternalServerErrorException(
        'Error occurred while hashing the password',
      );
    }
  }

  private async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      const typedError = error as Error;
      console.error(typedError);
      throw new InternalServerErrorException(
        'Error occurred while comparing passwords',
      );
    }
  }
}
