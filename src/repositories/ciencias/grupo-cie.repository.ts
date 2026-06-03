import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Grupo } from '../../entities/local/grupo.entity';

@Injectable()
export class GrupoCieRepository {
  constructor(
    @Inject('CIENCIAS_DATA_SOURCE') private readonly ds: DataSource,
  ) {}

  findAll() {
    return this.ds.getRepository(Grupo).find();
  }

  findById(id: string) {
    return this.ds.getRepository(Grupo).findOneBy({ id });
  }

  findByAsignatura(id_asignatura: string) {
    return this.ds.getRepository(Grupo).findBy({ id_asignatura });
  }

  // Grupos de un periodo (para oferta académica del periodo activo)
  findByPeriodo(id_periodo: string) {
    return this.ds.getRepository(Grupo).findBy({ id_periodo });
  }

  // Grupos asignados a un docente
  findByDocente(id_docente: string) {
    return this.ds.getRepository(Grupo).findBy({ id_docente });
  }

  findAbiertos() {
    return this.ds.getRepository(Grupo).findBy({ id_estado: 1 });
  }
}
