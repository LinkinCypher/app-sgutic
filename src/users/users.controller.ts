import { Controller, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: any): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUserDto: any): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<User> {
    return this.usersService.softDeleteUser(id);
  }

  // Otros métodos del controlador...
}
