import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Nota } from '../../entities/local/nota.entity';

@Injectable()
export class NotaIngRepository {
  constructor(
    @Inject('INGENIERIA_DATA_SOURCE') private readonly ds: DataSource,
  ) {}

  findAll() {
    return this.ds.getRepository(Nota).find();
  }

  findById(id: string) {
    return this.ds.getRepository(Nota).findOneBy({ id });
  }

  // Nota de un grupo de matrícula específico
  findByMatriculaGrupo(id_matricula_grupo: string) {
    return this.ds.getRepository(Nota).findOneBy({ id_matricula_grupo });
  }

  // Notas pendientes (nota_final null = aún no calculada o sin cortes)
  async findSinDefinir() {
    return this.ds
      .getRepository(Nota)
      .createQueryBuilder('n')
      .where('n.nota_final IS NULL')
      .getMany();
  }
}
