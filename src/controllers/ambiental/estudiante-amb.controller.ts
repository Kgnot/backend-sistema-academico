import { Controller, Get, Param } from '@nestjs/common';
import { EstudianteAmbRepository } from '../../repositories/ambiental/estudiante-amb.repository';

// Módulo de estudiantes - Facultad de Ambeniería
@Controller('api/ambiental/estudiantes')
export class EstudianteAmbController {
  constructor(private readonly repo: EstudianteAmbRepository) {}

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
