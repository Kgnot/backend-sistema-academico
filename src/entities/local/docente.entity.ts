import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('docentes')
export class Docente {
  @PrimaryColumn('uuid')
  id_docente: string;

  // FK lógica -> personas.persona_id (CENTRAL)
  @Column('uuid', { unique: true })
  persona_id: string;

  @Column('uuid')
  id_facultad: string;

  // FK -> tipos_vinculacion: planta|contrato|temporal|catedra|ocasional
  @Column()
  id_tipo_vinculacion: number;

  @Column({ nullable: true })
  categoria: string;

  @Column({ type: 'float', nullable: true })
  salario_actual: number;

  // FK -> estados_persona
  @Column()
  id_estado: number;
}
