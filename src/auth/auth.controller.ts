import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: { usuario: string; contraseña: string }) {
    const user = await this.authService.validateUser(loginDto.usuario, loginDto.contraseña);
    if (!user) {
      return { message: 'Usuario o contraseña incorrectos' };
    }
    return user;
  }
}
