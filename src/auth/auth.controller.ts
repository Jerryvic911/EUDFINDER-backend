import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Post('login')
  login(@Body() body: { email: string; role: string }) {
    const payload = { sub: 'some-id', email: body.email, role: body.role };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
