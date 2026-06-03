import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('administrativos')
export class Administrativo {
  @PrimaryColumn('uuid')
  id_administrativo: string;

  // FK lógica -> personas.persona_id (CENTRAL)
  @Column('uuid', { unique: true })
  persona_id: string;

  @Column('uuid')
  id_facultad: string;

  // FK -> cargos_administrativo
  @Column()
  id_cargo: number;

  // FK -> tipos_vinculacion
  @Column()
  id_tipo_vinculacion: number;
}
