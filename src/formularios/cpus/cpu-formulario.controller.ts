import { Controller, Post, Body, UseGuards, Request, Get, Param, Put } from '@nestjs/common';
import { CPUFormularioService } from './cpu-formulario.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

  // Nueva ruta para obtener los formularios del usuario logueado
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
}
