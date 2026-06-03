import { Controller, Get, Param } from '@nestjs/common';
import { HistorialAcademicoRepository } from '../../repositories/central/historial-academico.repository';

@Controller('api/central/historial')
export class HistorialAcademicoController {
  constructor(private readonly repo: HistorialAcademicoRepository) {}

  @Get()
  findAll() {
    return this.repo.findAll();
  }

  @Get('periodo/:id_periodo')
  findByPeriodo(@Param('id_periodo') id: string) {
    return this.repo.findByPeriodo(id);
  }

  // Historial completo de un estudiante (todas las materias cursadas)
  @Get('estudiante/:cod')
  findByEstudiante(@Param('cod') cod: string) {
    return this.repo.findByEstudiante(cod);
  }

  // Solo materias aprobadas
  @Get('estudiante/:cod/aprobadas')
  findAprobadas(@Param('cod') cod: string) {
    return this.repo.findAprobadas(cod);
  }

  // Promedio académico del estudiante
  @Get('estudiante/:cod/promedio')
  calcularPromedio(@Param('cod') cod: string) {
    return this.repo.calcularPromedio(cod);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.repo.findById(id);
  }
}
