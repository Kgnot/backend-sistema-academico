import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Usuario } from '../../entities/central/usuario.entity';

@Injectable()
export class UsuarioRepository {
  constructor(@Inject('CENTRAL_DATA_SOURCE') private readonly ds: DataSource) {}

  findByPersonaId(persona_id: string) {
    return this.ds.getRepository(Usuario).findOneBy({ persona_id });
  }

  findByCorreo(correo: string) {
    return this.ds.getRepository(Usuario).findOneBy({ correo });
  }

  actualizarUltimoAcceso(persona_id: string) {
    return this.ds
      .getRepository(Usuario)
      .update({ persona_id }, { ultimo_acceso_en: new Date() });
  }

  // Consulta la vista unificada: devuelve rol + facultad + identificador en una sola query
  async findLoginUnificado(correo: string): Promise<{
    persona_id: string;
    correo: string;
    contrasena_hash: string;
    rol: string;
    facultad: string;
    identificador: string;
    detalle: string;
  } | null> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const rows = await this.ds.query(
      `SELECT * FROM v_login_unificado WHERE correo = $1 LIMIT 1`,
      [correo],
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
    return rows.length ? rows[0] : null;
  }
}
