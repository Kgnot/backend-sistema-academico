import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('facultades')
export class Facultad {
  @PrimaryColumn('uuid')
  id_facultad: string;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  ubicacion: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  correo_institucional: string;
}
