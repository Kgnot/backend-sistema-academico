import { Controller, Get, Param } from '@nestjs/common';
import { AdministrativoCieRepository } from '../../repositories/ciencias/administrativo-cie.repository';

// Módulo de administrativos - Facultad de Cieeniería
@Controller('api/ciencias/administrativos')
export class AdministrativoCieController {
  constructor(private readonly repo: AdministrativoCieRepository) {}

  @Get()
  findAll() {
    return this.repo.findAll();
  }

  @Get('facultad/:id_facultad')
  findByFacultad(@Param('id_facultad') id: string) {
    return this.repo.findByFacultad(id);
  }

  // Por cargo: Secretario, Asistente, Coordinador de Lab, Auxiliar de Registro
  @Get('cargo/:id_cargo')
  findByCargo(@Param('id_cargo') id: string) {
    return this.repo.findByCargo(parseInt(id));
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
