import { Controller, Get, Param } from '@nestjs/common';
import { CalendarioAmbRepository } from '../../repositories/ambiental/calendario-amb.repository';

// Endpoint exclusivo para el calendario del estudiante.
// Devuelve todos los bloques horarios de sus asignaturas en un periodo.
@Controller('api/ambiental/calendario')
export class CalendarioAmbController {
  constructor(private readonly repo: CalendarioAmbRepository) {}

  // GET /api/ingenieria/calendario/:cod_estudiante/:id_periodo
  // El frontend pasa el cod_estudiante (del login) y el id_periodo activo
  // (de GET /api/central/periodos/activo).
  @Get(':cod_estudiante/:id_periodo')
  findCalendario(
    @Param('cod_estudiante') cod: string,
    @Param('id_periodo') idPeriodo: string,
  ) {
    return this.repo.findCalendarioEstudiante(cod, idPeriodo);
  }
}
