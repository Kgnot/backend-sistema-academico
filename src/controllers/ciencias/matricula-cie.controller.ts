import { Controller, Get, Param } from '@nestjs/common';
import { MatriculaCieRepository } from '../../repositories/ciencias/matricula-cie.repository';

@Controller('api/ciencias/matriculas')
export class MatriculaCieController {
  constructor(private readonly repo: MatriculaCieRepository) {}

  @Get()
  findAll() {
    return this.repo.findAll();
  }

  @Get('periodo/:id_periodo')
  findByPeriodo(@Param('id_periodo') id: string) {
    return this.repo.findByPeriodo(id);
  }

  @Get('estudiante/:cod')
  findByEstudiante(@Param('cod') cod: string) {
    return this.repo.findByEstudiante(cod);
  }

  // Matrícula de un estudiante en un periodo específico
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
