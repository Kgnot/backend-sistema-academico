import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Docente } from '../../entities/local/docente.entity';

@Injectable()
export class DocenteIngRepository {
  constructor(
    @Inject('INGENIERIA_DATA_SOURCE') private readonly ds: DataSource,
  ) {}

  findAll() {
    return this.ds.getRepository(Docente).find();
  }

  findById(id_docente: string) {
    return this.ds.getRepository(Docente).findOneBy({ id_docente });
  }

  findByPersonaId(persona_id: string) {
    return this.ds.getRepository(Docente).findOneBy({ persona_id });
  }

  findByFacultad(id_facultad: string) {
    return this.ds.getRepository(Docente).findBy({ id_facultad });
  }

  findActivos() {
    return this.ds.getRepository(Docente).findBy({ id_estado: 1 });
  }

  findByCategoria(categoria: string) {
    return this.ds.getRepository(Docente).findBy({ categoria });
  }

  // Docentes por tipo de vinculación (planta, cátedra, etc.)
  findByVinculacion(id_tipo_vinculacion: number) {
    return this.ds.getRepository(Docente).findBy({ id_tipo_vinculacion });
  }
}
