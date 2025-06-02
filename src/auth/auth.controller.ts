import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateAdminDto) {
    const user = await this.authService.registerAdmin(dto); //
    return this.authService.login(user);
  }

  @Post('login')
  async login(@Body() dto: CreateAdminDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.login(user);
  }
}
