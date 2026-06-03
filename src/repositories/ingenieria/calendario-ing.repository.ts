import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

// Repositorio exclusivo para el calendario del estudiante.
// Hace el JOIN completo: matriculas → grupos → horarios → salones → asignaturas
// Reemplaza 'INGENIERIA_DATA_SOURCE' por 'CIENCIAS_DATA_SOURCE' o
// 'AMBIENTAL_DATA_SOURCE' en las versiones de cada nodo.

@Injectable()
export class CalendarioIngRepository {
  constructor(
    @Inject('INGENIERIA_DATA_SOURCE') private readonly ds: DataSource,
  ) {}

  // Devuelve todos los bloques horarios del estudiante en un periodo dado.
  // Con esto el frontend puede construir el calendario directamente.
  async findCalendarioEstudiante(
    cod_estudiante: string,
    id_periodo: string,
  ): Promise<ClaseCalendario[]> {
    return this.ds.query(
      `
      SELECT
        h.id                  AS id_horario,
        h.dia_semana,
        h.hora_inicio,
        h.hora_fin,
        s.nombre              AS salon,
        a.codigo              AS codigo_asignatura,
        a.nombre              AS nombre_asignatura,
        a.creditos,
        g.numero_grupo,
        g.id                  AS id_grupo,
        g.id_docente,
        mg.id                 AS id_matricula_grupo,
        mg.id_estado          AS estado_cursada
      FROM matriculas m
      JOIN matriculas_grupos mg ON mg.id_matricula  = m.id
      JOIN grupos            g  ON g.id             = mg.id_grupo
      JOIN asignaturas        a  ON a.id             = g.id_asignatura
      JOIN horarios           h  ON h.id_grupo       = g.id
      JOIN salones            s  ON s.id             = h.id_salon
      WHERE m.cod_estudiante = $1
        AND m.id_periodo     = $2
        AND m.id_estado      = 1   -- solo matrícula activa
        AND g.id_estado      = 1   -- solo grupos abiertos
      ORDER BY
        CASE h.dia_semana
          WHEN 'lunes'     THEN 1
          WHEN 'martes'    THEN 2
          WHEN 'miercoles' THEN 3
          WHEN 'jueves'    THEN 4
          WHEN 'viernes'   THEN 5
          WHEN 'sabado'    THEN 6
          WHEN 'domingo'   THEN 7
        END,
        h.hora_inicio
      `,
      [cod_estudiante, id_periodo],
    );
  }
}

// Tipo de retorno (para documentar la forma de los datos)
export interface ClaseCalendario {
  id_horario: string;
  dia_semana: string;
  hora_inicio: string; // formato HH:mm:ss
  hora_fin: string;
  salon: string;
  codigo_asignatura: string;
  nombre_asignatura: string;
  creditos: number;
  numero_grupo: number;
  id_grupo: string;
  id_docente: string | null;
  id_matricula_grupo: string;
  estado_cursada: number; // 1=cursando 2=aprobado 3=reprobado
}
