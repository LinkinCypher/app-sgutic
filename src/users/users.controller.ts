import { Controller, Post, Put, Delete, Get, Body, Param, UseGuards, Request, NotFoundException, Query } from '@nestjs/common';
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
  @Roles(Role.Administrador) // Solo los administradores pueden crear usuarios
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put('update/:id')
  @Roles(Role.Administrador) // Solo los administradores pueden editar usuarios
  async update(@Param('id') id: string, @Body() updateUserDto: any): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete('delete/:id')
  @Roles(Role.Administrador) // Solo los administradores pueden eliminar usuarios
  async delete(@Param('id') id: string): Promise<User> {
    return this.usersService.softDeleteUser(id);
  }

  @Get('active')
  @Roles(Role.Administrador) // Solo los Roles pueden activar usuarios
  async findAllActive(): Promise<User[]> {
    return this.usersService.findAllActive();
  }

  @Get('all')
  @Roles(Role.Administrador) // Solo los Roles pueden ver todos los usuarios
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('profile')
  @Roles(Role.Administrador, Role.SuperSoporte, Role.SuperEquipos, Role.SuperMantenimiento, Role.SuperProyectos, Role.Soporte, Role.Equipos, Role.Mantenimiento, Role.Proyectos, Role.Lectura) // Solo los Roles pueden ver el dato de usuario
  getProfile(@Request() req) {
    return req.user; // Devuelve los datos del usuario autenticado
  }

  @Get('search')
  @Roles(Role.Administrador, Role.SuperSoporte, Role.SuperEquipos, Role.SuperMantenimiento, Role.SuperProyectos) // Solo los Roles pueden buscar
  async search(@Query('term') term: string): Promise<User[]> {
    return this.usersService.searchUsers(term);
  }

  @Get(':id')
  @Roles(Role.Administrador, Role.SuperSoporte, Role.SuperEquipos, Role.SuperMantenimiento, Role.SuperProyectos) // SOlo los Roles pueden ver por Id
  async getUsuario(@Param('id') id: string): Promise<User> {
    const usuario = await this.usersService.findOneById(id);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return usuario;
  }
}
