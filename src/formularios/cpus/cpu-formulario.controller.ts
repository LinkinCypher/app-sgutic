import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
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
}
