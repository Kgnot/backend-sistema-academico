import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Matricula } from '../../entities/local/matricula.entity';

@Injectable()
export class MatriculaCieRepository {
  constructor(
    @Inject('CIENCIAS_DATA_SOURCE') private readonly ds: DataSource,
  ) {}

  findAll() {
    return this.ds.getRepository(Matricula).find();
  }

  findById(id: string) {
    return this.ds.getRepository(Matricula).findOneBy({ id });
  }

  findByEstudiante(cod_estudiante: string) {
    return this.ds.getRepository(Matricula).findBy({ cod_estudiante });
  }

  // Matrícula activa del estudiante en un periodo
  findByEstudianteYPeriodo(cod_estudiante: string, id_periodo: string) {
    return this.ds
      .getRepository(Matricula)
      .findOneBy({ cod_estudiante, id_periodo });
  }

  findByPeriodo(id_periodo: string) {
    return this.ds.getRepository(Matricula).findBy({ id_periodo });
  }
}
