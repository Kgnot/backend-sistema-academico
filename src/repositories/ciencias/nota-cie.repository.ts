import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Nota } from '../../entities/local/nota.entity';

@Injectable()
export class NotaCieRepository {
  constructor(
    @Inject('CIENCIAS_DATA_SOURCE') private readonly ds: DataSource,
  ) {}

  findAll() {
    return this.ds.getRepository(Nota).find();
  }

  findById(id: string) {
    return this.ds.getRepository(Nota).findOneBy({ id });
  }

  findByMatriculaGrupo(id_matricula_grupo: string) {
    return this.ds.getRepository(Nota).findOneBy({ id_matricula_grupo });
  }

  async findSinDefinir() {
    return this.ds
      .getRepository(Nota)
      .createQueryBuilder('n')
      .where('n.nota_final IS NULL')
      .getMany();
  }

  // Notas del estudiante en un periodo con nombre de asignatura resuelto
  async findNotasPorEstudianteYPeriodo(cod_estudiante: string, id_periodo: string) {
    return this.ds.query(
      `
      SELECT
        n.id                  AS id_nota,
        n.corte1,
        n.corte2,
        n.corte3,
        n.nota_final,
        mg.id                 AS id_matricula_grupo,
        mg.id_estado          AS estado_cursada,
        g.id                  AS id_grupo,
        g.numero_grupo,
        a.id                  AS id_asignatura,
        a.codigo              AS codigo_asignatura,
        a.nombre              AS nombre_asignatura,
        a.creditos,
        a.semestre_sugerido
      FROM matriculas m
      JOIN matriculas_grupos mg ON mg.id_matricula = m.id
      JOIN grupos            g  ON g.id            = mg.id_grupo
      JOIN asignaturas        a  ON a.id            = g.id_asignatura
      LEFT JOIN notas         n  ON n.id_matricula_grupo = mg.id
      WHERE m.cod_estudiante = $1
        AND m.id_periodo     = $2
      ORDER BY a.semestre_sugerido, a.nombre
      `,
      [cod_estudiante, id_periodo],
    );
  }
}