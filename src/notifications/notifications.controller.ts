import { Controller, Get, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NotificationsService } from './notifications.service';

@Controller('notificaciones')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // Obtener todas las notificaciones del usuario logueado
  @Get('mis-notificaciones')
  async obtenerMisNotificaciones(@Request() req: any) {
    const usuarioLogueado = req.user;  // Obtener usuario logueado
    return this.notificationsService.obtenerNotificacionesPorUsuario(usuarioLogueado.username);
  }

  // Marcar una notificación como leída
  @Patch('leer/:id')
  async marcarComoLeida(@Param('id') id: string) {
    return this.notificationsService.marcarComoLeida(id);
  }
}
