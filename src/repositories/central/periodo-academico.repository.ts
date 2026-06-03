import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PeriodoAcademico } from '../../entities/central/periodo-academico.entity';

@Injectable()
export class PeriodoAcademicoRepository {
  constructor(
    @Inject('CENTRAL_DATA_SOURCE') private readonly ds: DataSource,
  ) {}

  findAll() {
    return this.ds.getRepository(PeriodoAcademico).find();
  }

  findById(id: string) {
    return this.ds.getRepository(PeriodoAcademico).findOneBy({ id });
  }

  // Periodo activo actual (id_estado = 2)
  findActivo() {
    return this.ds.getRepository(PeriodoAcademico).findOneBy({ id_estado: 2 });
  }

  findByEstado(id_estado: number) {
    return this.ds.getRepository(PeriodoAcademico).findBy({ id_estado });
  }
}
