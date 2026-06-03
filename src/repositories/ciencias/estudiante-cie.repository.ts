import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Estudiante } from '../../entities/local/estudiante.entity';

@Injectable()
export class EstudianteCieRepository {
  constructor(
    @Inject('CIENCIAS_DATA_SOURCE') private readonly ds: DataSource,
  ) {}

  findAll() {
    return this.ds.getRepository(Estudiante).find();
  }

  findByCodigo(cod_estudiante: string) {
    return this.ds.getRepository(Estudiante).findOneBy({ cod_estudiante });
  }

  findByPersonaId(persona_id: string) {
    return this.ds.getRepository(Estudiante).findOneBy({ persona_id });
  }

  findByPrograma(id_programa: string) {
    return this.ds.getRepository(Estudiante).findBy({ id_programa });
  }

  // Solo estudiantes activos (id_estado = 1)
  findActivos() {
    return this.ds.getRepository(Estudiante).findBy({ id_estado: 1 });
  }

  findByEstado(id_estado: number) {
    return this.ds.getRepository(Estudiante).findBy({ id_estado });
  }
}
