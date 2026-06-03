import { Controller, Get, Param } from '@nestjs/common';
import { DocenteIngRepository } from '../../repositories/ingenieria/docente-ing.repository';

// Módulo de profesores - Facultad de Ingeniería
@Controller('api/ingenieria/docentes')
export class DocenteIngController {
  constructor(private readonly repo: DocenteIngRepository) {}

  @Get()
  findAll() {
    return this.repo.findAll();
  }

  @Get('activos')
  findActivos() {
    return this.repo.findActivos();
  }

  @Get('categoria/:categoria')
  findByCategoria(@Param('categoria') cat: string) {
    return this.repo.findByCategoria(cat);
  }

  // Por tipo de vinculación (planta, cátedra, ocasional...)
  @Get('vinculacion/:id_tipo')
  findByVinculacion(@Param('id_tipo') id: string) {
    return this.repo.findByVinculacion(parseInt(id));
  }

  @Get('facultad/:id_facultad')
  findByFacultad(@Param('id_facultad') id: string) {
    return this.repo.findByFacultad(id);
  }

  @Get('persona/:persona_id')
  findByPersonaId(@Param('persona_id') id: string) {
    return this.repo.findByPersonaId(id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.repo.findById(id);
  }
}
