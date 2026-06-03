import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

// Consulta las vistas de login creadas localmente en cada nodo.
// Cada vista une la tabla local (estudiantes/docentes/administrativos)
// con la tabla usuarios de central a través de persona_id.
@Injectable()
export class VistasCienciasRepository {
  constructor(
    @Inject('CIENCIAS_DATA_SOURCE') private readonly ds: DataSource,
  ) {}

  // Vista de login para estudiantes de ciencias
  findLoginEstudiante(correo: string) {
    return this.ds.query(
      `SELECT * FROM v_login_estudiante WHERE correo = $1`,
      [correo],
    );
  }

  // Vista de login para docentes de ciencias
  findLoginDocente(correo: string) {
    return this.ds.query(
      `SELECT * FROM v_login_docente WHERE correo = $1`,
      [correo],
    );
  }

  // Vista de login para administrativos de ciencias
  findLoginAdministrativo(correo: string) {
    return this.ds.query(
      `SELECT * FROM v_login_administrativo WHERE correo = $1`,
      [correo],
    );
  }

  // Vista resumen del perfil de un estudiante (datos + programa + facultad)
  findPerfilEstudiante(cod_estudiante: string) {
    return this.ds.query(
      `SELECT * FROM v_perfil_estudiante WHERE cod_estudiante = $1`,
      [cod_estudiante],
    );
  }

  // Vista resumen del perfil de un docente (datos + grupos + asignaturas)
  findPerfilDocente(id_docente: string) {
    return this.ds.query(
      `SELECT * FROM v_perfil_docente WHERE id_docente = $1`,
      [id_docente],
    );
  }
}
