import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryColumn('uuid')
  persona_id: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  contrasena_hash: string;

  @Column({ type: 'timestamp', nullable: true })
  ultimo_acceso_en: Date;

  @Column({ type: 'timestamp', nullable: true })
  creado_en: Date;
}
