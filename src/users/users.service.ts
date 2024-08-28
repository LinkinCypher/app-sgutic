import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private auditService: AuditService // Inyecta el servicio de auditoría
  ) {}

  // Método para crear un usuario con la contraseña encriptada
  async create(createUserDto: any): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const createdUser = new this.userModel({ ...createUserDto, password: hashedPassword });
    const savedUser = await createdUser.save();

    // Registrar la acción en la auditoría
    await this.auditService.logAction('CREATE_USER', savedUser.usuario, savedUser);
    
    return savedUser;
  }

  // Método para validar la contraseña en el proceso de login
  async validatePassword(password: string, storedPasswordHash: string): Promise<boolean> {
    return bcrypt.compare(password, storedPasswordHash);  // Compara la contraseña proporcionada con el hash almacenado
  }

  // Encuentra un usuario por su nombre de usuario
  async findOneByUsuario(usuario: string): Promise<User | undefined> {
    return this.userModel.findOne({ usuario }).exec();
  }

  // Actualiza un usuario existente, incluyendo la posibilidad de cambiar la contraseña
  async updateUser(id: string, updateUserDto: any): Promise<User> {
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();

    // Registrar la acción en la auditoría
    await this.auditService.logAction('UPDATE_USER', updatedUser.usuario, updatedUser);
    
    return updatedUser;
  }

  // Realiza un borrado lógico del usuario (cambia el estado a false)
  async softDeleteUser(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndUpdate(id, { estado: false }, { new: true }).exec();

    // Registrar la acción en la auditoría
    await this.auditService.logAction('DELETE_USER', deletedUser.usuario, deletedUser);
    
    return deletedUser;
  }

  // Devuelve todos los usuarios activos
  async findAllActive(): Promise<User[]> {
    return this.userModel.find({ estado: true }).exec();
  }

  // Devuelve todos los usuarios, activos e inactivos
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Devuelve los datos de un usuario
  async findOneById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  // Búsqueda de usuarios por nombre, apellido o usuario
  async searchUsers(term: string): Promise<User[]> {
    const regex = new RegExp(term, 'i'); // 'i' para que sea insensible a mayúsculas/minúsculas
    return this.userModel.find({
      $or: [
        { nombres: regex },
        { apellidos: regex },
        { usuario: regex }
      ]
    }).exec();
  }
  
}
