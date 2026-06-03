import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Asignatura } from '../../entities/local/asignatura.entity';

@Injectable()
export class AsignaturaAmbRepository {
  constructor(
    @Inject('AMBIENTAL_DATA_SOURCE') private readonly ds: DataSource,
  ) {}

  findAll() {
    return this.ds.getRepository(Asignatura).find();
  }

  findById(id: string) {
    return this.ds.getRepository(Asignatura).findOneBy({ id });
  }

  findByCodigo(codigo: string) {
    return this.ds.getRepository(Asignatura).findOneBy({ codigo });
  }

  findByPrograma(id_programa: string) {
    return this.ds.getRepository(Asignatura).findBy({ id_programa });
  }

  findActivas() {
    return this.ds.getRepository(Asignatura).findBy({ id_estado: 1 });
  }

  // Asignaturas de un semestre específico
  findBySemestre(semestre_sugerido: number) {
    return this.ds.getRepository(Asignatura).findBy({ semestre_sugerido });
  }
}
