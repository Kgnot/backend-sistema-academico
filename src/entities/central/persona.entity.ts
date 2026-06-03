import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('personas')
export class Persona {
  @PrimaryColumn('uuid')
  persona_id: string;

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column({ type: 'date', nullable: true })
  fecha_nacimiento: string;

  @Column({ nullable: true })
  tipo_documento: string;

  @Column({ nullable: true })
  num_documento: string;

  @Column({ nullable: true })
  direccion: string;

  @Column({ nullable: true })
  telefono: string;
}
