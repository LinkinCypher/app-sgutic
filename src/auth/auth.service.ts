import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(usuario: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsuario(usuario);
    if (user && user.password === password) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }
}
