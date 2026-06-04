import { Controller, Get, Param } from '@nestjs/common';
import { CalendarioDocenteCieRepository } from '../../repositories/ciencias/calendario-docente-cie.repository';

// Horario semanal del docente con salon, asignatura y conteo de estudiantes
@Controller('api/ciencias/calendario/docente')
export class CalendarioDocenteCieController {
  constructor(private readonly repo: CalendarioDocenteCieRepository) {}

  // GET /api/ciencias/calendario/docente/:id_docente/:id_periodo
  @Get(':id_docente/:id_periodo')
  findCalendario(
    @Param('id_docente') idDocente: string,
    @Param('id_periodo') idPeriodo: string,
  ) {
    return this.repo.findCalendarioDocente(idDocente, idPeriodo);
  }
}
