import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('coordinadores')
export class Coordinador {
  @PrimaryColumn('uuid')
  id_coordinador: string;

  // FK lógica -> personas.persona_id (CENTRAL). Sin UNIQUE: varias coordinaciones por persona
  @Column('uuid')
  persona_id: string;

  @Column('uuid')
  id_programa: string;

  @Column({ type: 'date', nullable: true })
  fecha_inicio: string;

  @Column({ type: 'date', nullable: true })
  fecha_fin: string;
}
