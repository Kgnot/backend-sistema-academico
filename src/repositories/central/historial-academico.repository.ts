import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { HistorialAcademico } from '../../entities/central/historial-academico.entity';

@Injectable()
export class HistorialAcademicoRepository {
  constructor(
    @Inject('CENTRAL_DATA_SOURCE') private readonly ds: DataSource,
  ) {}

  findAll() {
    return this.ds.getRepository(HistorialAcademico).find();
  }

  findById(id_historial: string) {
    return this.ds.getRepository(HistorialAcademico).findOneBy({ id_historial });
  }

  // Historial completo de un estudiante (todas las asignaturas cursadas)
  findByEstudiante(cod_estudiante: string) {
    return this.ds
      .getRepository(HistorialAcademico)
      .findBy({ cod_estudiante });
  }

  // Historial por periodo (útil para reportes del módulo administrador)
  findByPeriodo(id_periodo: string) {
    return this.ds.getRepository(HistorialAcademico).findBy({ id_periodo });
  }

  // Asignaturas aprobadas de un estudiante
  findAprobadas(cod_estudiante: string) {
    return this.ds
      .getRepository(HistorialAcademico)
      .findBy({ cod_estudiante, id_estado: 1 });
  }

  // Promedio final de un estudiante
  async calcularPromedio(cod_estudiante: string): Promise<number> {
    const result = await this.ds
      .getRepository(HistorialAcademico)
      .createQueryBuilder('h')
      .select('AVG(h.nota_final)', 'promedio')
      .where('h.cod_estudiante = :cod AND h.id_estado = 1', { cod: cod_estudiante })
      .getRawOne();
    return parseFloat(result?.promedio ?? '0');
  }
}
