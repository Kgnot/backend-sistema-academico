import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('homologaciones')
export class Homologacion {
  @PrimaryColumn('uuid')
  id_homologacion: string;

  @Column()
  cod_estudiante: string;

  @Column({ nullable: true })
  asignatura_origen: string;

  @Column({ nullable: true })
  institucion_origen: string;

  @Column({ type: 'uuid', nullable: true })
  id_asignatura_homologada: string;

  @Column({ type: 'date', nullable: true })
  fecha_solicitud: string;

  // FK -> estados_homologacion: pendiente|aprobada|rechazada
  @Column()
  id_estado: number;

  @Column({ nullable: true })
  observacion: string;
}
