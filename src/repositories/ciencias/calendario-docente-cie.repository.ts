import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CalendarioDocenteCieRepository {
  constructor(
    @Inject('CIENCIAS_DATA_SOURCE') private readonly ds: DataSource,
  ) {}

  // Bloques horarios del docente en un periodo + conteo de estudiantes por grupo
  async findCalendarioDocente(id_docente: string, id_periodo: string) {
    return this.ds.query(
      `
      SELECT
        h.id                    AS id_horario,
        h.dia_semana,
        h.hora_inicio,
        h.hora_fin,
        s.nombre                AS salon,
        a.codigo                AS codigo_asignatura,
        a.nombre                AS nombre_asignatura,
        a.creditos,
        g.id                    AS id_grupo,
        g.numero_grupo,
        g.cupo_maximo,
        COUNT(mg.id)::int       AS estudiantes_matriculados
      FROM grupos g
      JOIN asignaturas        a  ON a.id       = g.id_asignatura
      JOIN horarios           h  ON h.id_grupo = g.id
      JOIN salones            s  ON s.id       = h.id_salon
      LEFT JOIN matriculas_grupos mg ON mg.id_grupo  = g.id
      LEFT JOIN matriculas        m  ON m.id          = mg.id_matricula
                                     AND m.id_estado  = 1
      WHERE g.id_docente = $1
        AND g.id_periodo = $2
        AND g.id_estado  = 1
      GROUP BY
        h.id, h.dia_semana, h.hora_inicio, h.hora_fin,
        s.nombre, a.codigo, a.nombre, a.creditos,
        g.id, g.numero_grupo, g.cupo_maximo
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
      [id_docente, id_periodo],
    );
  }
}
