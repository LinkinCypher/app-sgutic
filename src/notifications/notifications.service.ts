import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  
  // Método para enviar notificaciones
  async enviarNotificacion(usuario: string, mensaje: string): Promise<void> {
    // Implementar el envío de una notificación por correo.
    console.log(`Enviando notificación a ${usuario}: ${mensaje}`);
  }

}
