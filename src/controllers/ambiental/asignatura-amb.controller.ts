import { Controller, Get, Param } from '@nestjs/common';
import { AsignaturaAmbRepository } from '../../repositories/ambiental/asignatura-amb.repository';

@Controller('api/ambiental/asignaturas')
export class AsignaturaAmbController {
  constructor(private readonly repo: AsignaturaAmbRepository) {}

  @Get()
  findAll() {
    return this.repo.findAll();
  }

  @Get('activas')
  findActivas() {
    return this.repo.findActivas();
  }

  @Get('programa/:id_programa')
  findByPrograma(@Param('id_programa') id: string) {
    return this.repo.findByPrograma(id);
  }

  // Asignaturas de un semestre dado (útil para el módulo estudiante al ver pensum)
  @Get('semestre/:semestre')
  findBySemestre(@Param('semestre') s: string) {
    return this.repo.findBySemestre(parseInt(s));
  }

  @Get('codigo/:codigo')
  findByCodigo(@Param('codigo') codigo: string) {
    return this.repo.findByCodigo(codigo);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.repo.findById(id);
  }
}
