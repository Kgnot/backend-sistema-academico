import { Controller, Get, Param, Post, Body, NotFoundException } from '@nestjs/common';
import { VistasIngenieriaRepository } from '../../repositories/vistas/vistas-ingenieria.repository';

// Vistas de login y perfil para la Facultad de Ingeniería.
// Permite al frontend determinar el rol del usuario dentro de este nodo.
@Controller('api/ingenieria/vistas')
export class VistasIngenieriaController {
  constructor(private readonly repo: VistasIngenieriaRepository) {}

  // Login: determina si el correo corresponde a un estudiante de ingeniería
  @Post('login/estudiante')
  async loginEstudiante(@Body() body: { correo: string }) {
    const result = await this.repo.findLoginEstudiante(body.correo);
    if (!result?.length) throw new NotFoundException('No es estudiante de esta facultad');
    return result[0];
  }

  // Login: determina si el correo corresponde a un docente de ingeniería
  @Post('login/docente')
  async loginDocente(@Body() body: { correo: string }) {
    const result = await this.repo.findLoginDocente(body.correo);
    if (!result?.length) throw new NotFoundException('No es docente de esta facultad');
    return result[0];
  }

  // Login: determina si el correo corresponde a un administrativo de ingeniería
  @Post('login/administrativo')
  async loginAdministrativo(@Body() body: { correo: string }) {
    const result = await this.repo.findLoginAdministrativo(body.correo);
    if (!result?.length) throw new NotFoundException('No es administrativo de esta facultad');
    return result[0];
  }

  // Perfil completo del estudiante (para el dashboard del módulo estudiante)
  @Get('perfil/estudiante/:cod')
  findPerfilEstudiante(@Param('cod') cod: string) {
    return this.repo.findPerfilEstudiante(cod);
  }

  // Perfil completo del docente (para el dashboard del módulo profesor)
  @Get('perfil/docente/:id')
  findPerfilDocente(@Param('id') id: string) {
    return this.repo.findPerfilDocente(id);
  }
}
