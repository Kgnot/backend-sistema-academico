import { Controller, Get, Param } from '@nestjs/common';
import { GrupoAmbRepository } from '../../repositories/ambiental/grupo-amb.repository';

@Controller('api/ambiental/grupos')
export class GrupoAmbController {
  constructor(private readonly repo: GrupoAmbRepository) {}

  @Get()
  findAll() {
    return this.repo.findAll();
  }

  // Grupos abiertos del periodo: oferta académica actual
  @Get('abiertos')
  findAbiertos() {
    return this.repo.findAbiertos();
  }

  @Get('periodo/:id_periodo')
  findByPeriodo(@Param('id_periodo') id: string) {
    return this.repo.findByPeriodo(id);
  }

  @Get('asignatura/:id_asignatura')
  findByAsignatura(@Param('id_asignatura') id: string) {
    return this.repo.findByAsignatura(id);
  }

  // Grupos que dicta un docente (módulo de profesores)
  @Get('docente/:id_docente')
  findByDocente(@Param('id_docente') id: string) {
    return this.repo.findByDocente(id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.repo.findById(id);
  }
}
