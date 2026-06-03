import { Controller, Get, Param } from '@nestjs/common';
import { EstudianteIngRepository } from '../../repositories/ingenieria/estudiante-ing.repository';

// Módulo de estudiantes - Facultad de Ingeniería
@Controller('api/ingenieria/estudiantes')
export class EstudianteIngController {
  constructor(private readonly repo: EstudianteIngRepository) {}

  @Get()
  findAll() {
    return this.repo.findAll();
  }

  // Solo activos (útil para listar en el dashboard de estudiantes)
  @Get('activos')
  findActivos() {
    return this.repo.findActivos();
  }

  @Get('programa/:id_programa')
  findByPrograma(@Param('id_programa') id: string) {
    return this.repo.findByPrograma(id);
  }

  @Get('estado/:id_estado')
  findByEstado(@Param('id_estado') id: string) {
    return this.repo.findByEstado(parseInt(id));
  }

  @Get('persona/:persona_id')
  findByPersonaId(@Param('persona_id') id: string) {
    return this.repo.findByPersonaId(id);
  }

  @Get(':cod')
  findByCodigo(@Param('cod') cod: string) {
    return this.repo.findByCodigo(cod);
  }
}
