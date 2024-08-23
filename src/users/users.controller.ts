import { Controller, Post, Put, Delete, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.schema';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../roles/role.enum';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) // Protege todo el controlador con JWT y roles
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @Roles(Role.Admin) // Solo los administradores pueden crear usuarios
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put('update/:id')
  @Roles(Role.Admin) // Solo los administradores pueden editar usuarios
  async update(@Param('id') id: string, @Body() updateUserDto: any): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete('delete/:id')
  @Roles(Role.Admin) // Solo los administradores pueden eliminar usuarios
  async delete(@Param('id') id: string): Promise<User> {
    return this.usersService.softDeleteUser(id);
  }

  @Get('active')
  @Roles(Role.Admin, Role.Gestor) // Administradores y gestores pueden ver usuarios activos
  async findAllActive(): Promise<User[]> {
    return this.usersService.findAllActive();
  }

  @Get('all')
  @Roles(Role.Admin) // Solo los administradores pueden ver todos los usuarios
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('profile')
  @Roles(Role.Admin, Role.Gestor, Role.Tecnico, Role.Usuario) // Todos los roles pueden ver su perfil
  getProfile(@Request() req) {
    return req.user; // Devuelve los datos del usuario autenticado
  }
}
