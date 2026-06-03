import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Administrador } from '../../entities/central/administrador.entity';

@Injectable()
export class AdministradorRepository {
  constructor(
    @Inject('CENTRAL_DATA_SOURCE') private readonly ds: DataSource,
  ) {}

  findAll() {
    return this.ds.getRepository(Administrador).find();
  }

  findById(id_administrador: string) {
    return this.ds.getRepository(Administrador).findOneBy({ id_administrador });
  }

  // Verifica si una persona es administrador (usado en login para determinar rol)
  findByPersonaId(persona_id: string) {
    return this.ds.getRepository(Administrador).findOneBy({ persona_id });
  }

  findByArea(id_area_gestion: number) {
    return this.ds.getRepository(Administrador).findBy({ id_area_gestion });
  }
}
