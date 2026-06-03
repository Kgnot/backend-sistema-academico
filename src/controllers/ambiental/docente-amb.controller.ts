import { Controller, Get, Param } from '@nestjs/common';
import { DocenteAmbRepository } from '../../repositories/ambiental/docente-amb.repository';

// Módulo de profesores - Facultad de Ambeniería
@Controller('api/ambiental/docentes')
export class DocenteAmbController {
  constructor(private readonly repo: DocenteAmbRepository) {}

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
