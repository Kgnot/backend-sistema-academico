import { Controller, Get, Param } from '@nestjs/common';
import { CalendarioDocenteAmbRepository } from '../../repositories/ambiental/calendario-docente-amb.repository';

// Horario semanal del docente con salon, asignatura y conteo de estudiantes
@Controller('api/ambiental/calendario/docente')
export class CalendarioDocenteAmbController {
  constructor(private readonly repo: CalendarioDocenteAmbRepository) {}

  // GET /api/ambiental/calendario/docente/:id_docente/:id_periodo
  @Get(':id_docente/:id_periodo')
  findCalendario(
    @Param('id_docente') idDocente: string,
    @Param('id_periodo') idPeriodo: string,
  ) {
    return this.repo.findCalendarioDocente(idDocente, idPeriodo);
  }
}
