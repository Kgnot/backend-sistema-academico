import { Controller, Get, Param } from '@nestjs/common';
import { LiquidacionRepository } from '../../repositories/central/liquidacion.repository';

@Controller('api/central/liquidaciones')
export class LiquidacionController {
  constructor(private readonly repo: LiquidacionRepository) {}

  @Get()
  findAll() {
    return this.repo.findAll();
  }

  // Liquidaciones con deuda activa (para módulo administrador/financiero)
  @Get('pendientes')
  findPendientes() {
    return this.repo.findPendientes();
  }

  @Get('estudiante/:cod')
  findByEstudiante(@Param('cod') cod: string) {
    return this.repo.findByEstudiante(cod);
  }

  @Get('estudiante/:cod/periodo/:id_periodo')
  findByEstudianteYPeriodo(
    @Param('cod') cod: string,
    @Param('id_periodo') id: string,
  ) {
    return this.repo.findByEstudianteYPeriodo(cod, id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.repo.findById(id);
  }
}
