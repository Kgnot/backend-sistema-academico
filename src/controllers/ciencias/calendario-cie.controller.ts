import { Controller, Get, Param } from '@nestjs/common';
import { CalendarioCieRepository } from '../../repositories/ciencias/calendario-cie.repository';

// Endpoint exclusivo para el calendario del estudiante.
// Devuelve todos los bloques horarios de sus asignaturas en un periodo.
@Controller('api/ciencias/calendario')
export class CalendarioCieController {
  constructor(private readonly repo: CalendarioCieRepository) {}

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
