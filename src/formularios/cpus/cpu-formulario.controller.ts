import { Controller, Post, Body, UseGuards, Request, Get, Param, Put } from '@nestjs/common';
import { CPUFormularioService } from './cpu-formulario.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('cpus')
@UseGuards(JwtAuthGuard) // Protege la ruta con JWT
export class CPUFormularioController {
  constructor(private readonly cpuFormularioService: CPUFormularioService) {}

  @Post('create')
  async crearFormulario(@Body() createFormularioDto: any, @Request() req: any) {
    const usuarioLogueado = req.user; // Extrae el usuario logueado
    createFormularioDto.usuario = usuarioLogueado.username; // Asigna el usuario logueado al campo de usuario
    return this.cpuFormularioService.crearFormulario(createFormularioDto);
  }

  // Obtener los formularios del usuario logueado
  @Get('mis-formularios')
  async obtenerMisFormularios(@Request() req: any) {
    const usuarioLogueado = req.user; // Extrae el usuario logueado
    return this.cpuFormularioService.obtenerFormulariosPorUsuario(usuarioLogueado.username);
  }

  // Agregar ruta PUT para actualizar un formulario existente
  @Put('update/:id')
  async actualizarFormulario(
    @Param('id') id: string, 
    @Body() updateFormularioDto: any, 
    @Request() req: any
  ) {
    const usuarioLogueado = req.user; // Extrae el usuario logueado
    updateFormularioDto.usuario = usuarioLogueado.username; // Asigna el usuario logueado al campo de usuario
    return this.cpuFormularioService.actualizarFormulario(id, updateFormularioDto);
  }

  // Obtener todos los formularios por usuario
  @Get('all')
  @Roles(Role.Administrador) // Solo accesible para administradores
  async obtenerTodosLosFormularios() {
    return this.cpuFormularioService.obtenerFormularios();
  }

  // Obtener el número de formularios por usuario
  @Get('estadisticas/formularios-por-usuario')
  @Roles(Role.Administrador) // Solo accesible para administradores
  async obtenerConteoFormulariosPorUsuario() {
    return this.cpuFormularioService.contarFormulariosPorUsuario();
  }

}
