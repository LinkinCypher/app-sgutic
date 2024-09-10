import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './notification.schema';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification.name) private notificationModel: Model<Notification>) {}

  // Método para enviar una notificación
  async enviarNotificacion(data: { titulo: string, mensaje: string, destinatario: string }): Promise<Notification> {
    const nuevaNotificacion = new this.notificationModel(data);
    return nuevaNotificacion.save();
  }

  // Método para obtener las notificaciones de un usuario
  async obtenerNotificacionesPorUsuario(destinatario: string): Promise<Notification[]> {
    return this.notificationModel.find({ destinatario }).exec();
  }

  // Marcar una notificación como leída
  async marcarComoLeida(id: string): Promise<Notification> {
    return this.notificationModel.findByIdAndUpdate(id, { leido: true }, { new: true }).exec();
  }
}
