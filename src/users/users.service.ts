import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: any): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOneByUsuario(usuario: string): Promise<User> {
    return this.userModel.findOne({ usuario }).exec();
  }

  async updateUser(id: string, updateUserDto: any): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async softDeleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, { estado: 'eliminado' }, { new: true }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec(); // Devuelve todos los usuarios sin filtrar por estado
  }
  
  async findAllActive(): Promise<User[]> {
    return this.userModel.find({ estado: 'activo' }).exec();
  }

  // Otros métodos del servicio...
}
