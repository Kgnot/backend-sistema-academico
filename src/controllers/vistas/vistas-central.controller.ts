import { Controller, Get, Param } from '@nestjs/common';
import { VistasCentralRepository } from '../../repositories/vistas/vistas-central.repository';

// Endpoints para el módulo administrador: consolida datos de los 3 nodos
@Controller('api/administrador/vistas')
export class VistasCentralController {
  constructor(private readonly repo: VistasCentralRepository) {}

  // Todos los estudiantes de la institución (via vistas con dblink)
  @Get('estudiantes')
  findEstudiantesInstitucional() {
    return this.repo.findEstudiantesInstitucional();
  }

  // Filtrar estudiantes por nombre de facultad
  @Get('estudiantes/facultad/:nombre')
  findEstudiantesPorFacultad(@Param('nombre') nombre: string) {
    return this.repo.findEstudiantesPorFacultad(nombre);
  }

  // Todos los docentes de la institución
  @Get('docentes')
  findDocentesInstitucional() {
    return this.repo.findDocentesInstitucional();
  }

  // Filtrar docentes por nombre de facultad
  @Get('docentes/facultad/:nombre')
  findDocentesPorFacultad(@Param('nombre') nombre: string) {
    return this.repo.findDocentesPorFacultad(nombre);
  }

  // Conteo de estudiantes por facultad
  @Get('resumen/estudiantes-por-facultad')
  findTotalEstudiantesPorFacultad() {
    return this.repo.findTotalEstudiantesPorFacultad();
  }

  // Promedio de notas por facultad
  @Get('resumen/promedio-notas')
  findPromedioNotasPorFacultad() {
    return this.repo.findPromedioNotasPorFacultad();
  }
}
