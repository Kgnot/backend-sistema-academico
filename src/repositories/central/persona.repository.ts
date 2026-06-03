import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Persona } from '../../entities/central/persona.entity';

@Injectable()
export class PersonaRepository {
  constructor(
    @Inject('CENTRAL_DATA_SOURCE') private readonly ds: DataSource,
  ) {}

  findAll() {
    return this.ds.getRepository(Persona).find();
  }

  findById(persona_id: string) {
    return this.ds.getRepository(Persona).findOneBy({ persona_id });
  }

  findByDocumento(tipo: string, num: string) {
    return this.ds.getRepository(Persona).findOneBy({
      tipo_documento: tipo,
      num_documento:  num,
    });
  }

  async searchByNombre(termino: string) {
    return this.ds
      .getRepository(Persona)
      .createQueryBuilder('p')
      .where('LOWER(p.nombres) LIKE :t OR LOWER(p.apellidos) LIKE :t', {
        t: `%${termino.toLowerCase()}%`,
      })
      .getMany();
  }

  // Solo telefono y direccion — lo único editable por el estudiante
  async updateContacto(
    persona_id: string,
    campos: { telefono?: string; direccion?: string },
  ) {
    const payload: Partial<Persona> = {};
    if (campos.telefono  !== undefined) payload.telefono  = campos.telefono;
    if (campos.direccion !== undefined) payload.direccion = campos.direccion;

    if (Object.keys(payload).length === 0) return { affected: 0 };

    return this.ds.getRepository(Persona).update({ persona_id }, payload);
  }
}