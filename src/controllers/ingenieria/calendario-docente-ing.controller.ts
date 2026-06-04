import { Controller, Get, Param } from '@nestjs/common';
import { CalendarioDocenteIngRepository } from '../../repositories/ingenieria/calendario-docente-ing.repository';

// Horario semanal del docente con salon, asignatura y conteo de estudiantes
@Controller('api/ingenieria/calendario/docente')
export class CalendarioDocenteIngController {
  constructor(private readonly repo: CalendarioDocenteIngRepository) {}

  // GET /api/ingenieria/calendario/docente/:id_docente/:id_periodo
  @Get(':id_docente/:id_periodo')
  findCalendario(
    @Param('id_docente') idDocente: string,
    @Param('id_periodo') idPeriodo: string,
  ) {
    return this.repo.findCalendarioDocente(idDocente, idPeriodo);
  }
}
