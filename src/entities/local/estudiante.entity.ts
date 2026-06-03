import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('estudiantes')
export class Estudiante {
  @PrimaryColumn()
  cod_estudiante: string;

  // FK lógica -> personas.persona_id (CENTRAL)
  @Column('uuid', { unique: true })
  persona_id: string;

  @Column('uuid')
  id_programa: string;

  // FK -> estados_persona: activo|inactivo|retirado|suspendido|egresado
  @Column()
  id_estado: number;
}
