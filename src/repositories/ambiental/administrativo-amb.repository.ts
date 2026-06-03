import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Administrativo } from '../../entities/local/administrativo.entity';

@Injectable()
export class AdministrativoAmbRepository {
  constructor(
    @Inject('AMBIENTAL_DATA_SOURCE') private readonly ds: DataSource,
  ) {}

  findAll() {
    return this.ds.getRepository(Administrativo).find();
  }

  findById(id_administrativo: string) {
    return this.ds.getRepository(Administrativo).findOneBy({ id_administrativo });
  }

  findByPersonaId(persona_id: string) {
    return this.ds.getRepository(Administrativo).findOneBy({ persona_id });
  }

  findByFacultad(id_facultad: string) {
    return this.ds.getRepository(Administrativo).findBy({ id_facultad });
  }

  findByCargo(id_cargo: number) {
    return this.ds.getRepository(Administrativo).findBy({ id_cargo });
  }
}
