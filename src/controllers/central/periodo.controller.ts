import { Controller, Get, Param } from '@nestjs/common';
import { PeriodoAcademicoRepository } from '../../repositories/central/periodo-academico.repository';

@Controller('api/central/periodos')
export class PeriodoAcademicoController {
  constructor(private readonly repo: PeriodoAcademicoRepository) {}

  @Get()
  findAll() {
    return this.repo.findAll();
  }

  // Periodo activo actual (útil para el dashboard de todos los módulos)
  @Get('activo')
  findActivo() {
    return this.repo.findActivo();
  }

  @Get('estado/:id_estado')
  findByEstado(@Param('id_estado') id: string) {
    return this.repo.findByEstado(parseInt(id));
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.repo.findById(id);
  }
}
