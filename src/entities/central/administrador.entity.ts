import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('administradores')
export class Administrador {
  @PrimaryColumn('uuid')
  id_administrador: string;

  @Column('uuid')
  persona_id: string;

  @Column()
  id_area_gestion: number;
}
