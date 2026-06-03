import { Controller, Get, Param } from '@nestjs/common';
import { NotaAmbRepository } from '../../repositories/ambiental/nota-amb.repository';

@Controller('api/ambiental/notas')
export class NotaAmbController {
  constructor(private readonly repo: NotaAmbRepository) {}

  @Get()
  findAll() {
    return this.repo.findAll();
  }

  @Get('sin-definir')
  findSinDefinir() {
    return this.repo.findSinDefinir();
  }

  @Get('matricula-grupo/:id_mg')
  findByMatriculaGrupo(@Param('id_mg') id: string) {
    return this.repo.findByMatriculaGrupo(id);
  }

  // Notas del estudiante en un periodo con nombre de asignatura resuelto
  @Get('estudiante/:cod/periodo/:id_periodo')
  findNotasPorEstudianteYPeriodo(
    @Param('cod') cod: string,
    @Param('id_periodo') idPeriodo: string,
  ) {
    return this.repo.findNotasPorEstudianteYPeriodo(cod, idPeriodo);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.repo.findById(id);
  }
}