import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CPUFormulario } from './cpu-formulario.schema';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class CPUFormularioService {
  constructor(
    @InjectModel(CPUFormulario.name) private cpuFormularioModel: Model<CPUFormulario>,
    private notificationsService: NotificationsService // Inyecta el servicio de notificaciones
  ) {}

  // Crear un nuevo formulario de CPU
  async crearFormulario(createFormularioDto: any): Promise<CPUFormulario> {
    const numeroFormulario = await this.generarNumeroFormulario(createFormularioDto);
    const nuevoFormulario = new this.cpuFormularioModel({
      ...createFormularioDto,
      numeroFormulario, // Número de formulario generado
    });

    const formularioGuardado = await nuevoFormulario.save();
    
    // Enviar notificación al usuario
    await this.notificationsService.enviarNotificacion(
      createFormularioDto.usuario, 
      `Has creado un nuevo formulario: ${numeroFormulario}`
    );

    console.log('Formulario de CPU: Creado');
    return formularioGuardado;
  }

  // Obtener todos los formularios de CPU
  async obtenerFormularios(): Promise<CPUFormulario[]> {
    return this.cpuFormularioModel.find().exec();
  }

  // Obtener formularios por el usuario logueado
  async obtenerFormulariosPorUsuario(usuario: string): Promise<CPUFormulario[]> {
    return this.cpuFormularioModel.find({ usuario }).exec(); // Filtra por el campo 'usuario'
  }
  
  // Obtener un formulario por su ID
  async obtenerFormularioPorId(id: string): Promise<CPUFormulario> {
    const formulario = await this.cpuFormularioModel.findById(id).exec();
    if (!formulario) {
      throw new NotFoundException(`Formulario con ID ${id} no encontrado`);
    }
    return formulario;
  }

  // Actualizar un formulario por su ID
  async actualizarFormulario(id: string, updateFormularioDto: any): Promise<CPUFormulario> {
    const formularioActualizado = await this.cpuFormularioModel.findByIdAndUpdate(id, updateFormularioDto, {
      new: true,
    }).exec();

    if (!formularioActualizado) {
      throw new NotFoundException(`Formulario con ID ${id} no encontrado`);
    }

    // Enviar notificación al usuario
    await this.notificationsService.enviarNotificacion(
      updateFormularioDto.usuario, 
      `Has actualizado el formulario: ${formularioActualizado.numeroFormulario}`
    );

    console.log(`Formulario ${id} actualizado por el usuario ${updateFormularioDto.usuario}`);
    return formularioActualizado;
  }
  

  // Generar el número de formulario
  private async generarNumeroFormulario(createFormularioDto: any): Promise<string> {
    const { institucion, provincia, edificio } = createFormularioDto;

    // Obtener el año actual
    const currentYear = new Date().getFullYear();

    // Contar cuántos formularios existen para esta combinación de Institución - Provincia - Edificio y el año actual
    const count = await this.cpuFormularioModel.countDocuments({
      institucion,
      provincia,
      edificio,
      numeroFormulario: { $regex: `${currentYear}` }  // Busca formularios del año actual
    }).exec();

    // Generar el número de formulario basado en el conteo actual
    const numero = (count + 1).toString().padStart(4, '0'); // Padding con ceros para asegurar cuatro dígitos
    return `${institucion}-${provincia}-${edificio}-FMA-CPU-${currentYear}-${numero}`;
  }
}