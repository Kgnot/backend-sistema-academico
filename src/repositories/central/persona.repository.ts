import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Persona } from '../../entities/central/persona.entity';

@Injectable()
export class PersonaRepository {
  constructor(
    @Inject('CENTRAL_DATA_SOURCE') private readonly ds: DataSource,
  ) {}

  // Todas las personas
  findAll() {
    return this.ds.getRepository(Persona).find();
  }

  // Buscar por ID
  findById(persona_id: string) {
    return this.ds.getRepository(Persona).findOneBy({ persona_id });
  }

  // Buscar por número de documento
  findByDocumento(tipo: string, num: string) {
    return this.ds.getRepository(Persona).findOneBy({
      tipo_documento: tipo,
      num_documento: num,
    });
  }

  // Búsqueda por nombre o apellido (útil para el módulo administrador)
  async searchByNombre(termino: string) {
    return this.ds
      .getRepository(Persona)
      .createQueryBuilder('p')
      .where('LOWER(p.nombres) LIKE :t OR LOWER(p.apellidos) LIKE :t', {
        t: `%${termino.toLowerCase()}%`,
      })
      .getMany();
  }
}
