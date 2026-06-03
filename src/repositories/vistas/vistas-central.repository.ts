import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

// Este repositorio consulta únicamente vistas definidas en la BD central.
// Las vistas encapsulan los dblinks; el código TypeScript no tiene ninguna
// cadena de conexión a los nodos remotos.
@Injectable()
export class VistasCentralRepository {
  constructor(
    @Inject('CENTRAL_DATA_SOURCE') private readonly ds: DataSource,
  ) {}

  // Vista: estudiantes de todos los nodos con su facultad y programa
  findEstudiantesInstitucional() {
    return this.ds.query(`SELECT * FROM v_estudiantes_institucional`);
  }

  // Vista: docentes de todos los nodos consolidados
  findDocentesInstitucional() {
    return this.ds.query(`SELECT * FROM v_docentes_institucional`);
  }

  // Vista: total de estudiantes por facultad
  findTotalEstudiantesPorFacultad() {
    return this.ds.query(`SELECT * FROM v_total_estudiantes_por_facultad`);
  }

  // Vista: promedio de notas por facultad
  findPromedioNotasPorFacultad() {
    return this.ds.query(`SELECT * FROM v_promedio_notas_por_facultad`);
  }

  // Filtrar vista institucional por facultad
  findEstudiantesPorFacultad(nombre_facultad: string) {
    return this.ds.query(
      `SELECT * FROM v_estudiantes_institucional WHERE facultad = $1`,
      [nombre_facultad],
    );
  }

  // Filtrar docentes por facultad
  findDocentesPorFacultad(nombre_facultad: string) {
    return this.ds.query(
      `SELECT * FROM v_docentes_institucional WHERE facultad = $1`,
      [nombre_facultad],
    );
  }
}
