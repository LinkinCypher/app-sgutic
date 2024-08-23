import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(usuario: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsuario(usuario);
    if (user && await this.usersService.validatePassword(password, user.password)) {
      const { password, ...result } = user.toObject(); 
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.usuario, sub: user._id, rol: user.rol }; 
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
