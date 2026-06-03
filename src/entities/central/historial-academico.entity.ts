import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('historial_academico')
export class HistorialAcademico {
  @PrimaryColumn('uuid')
  id_historial: string;

  @Column()
  cod_estudiante: string;

  @Column('uuid')
  id_asignatura: string;

  @Column('uuid')
  id_periodo: string;

  @Column({ type: 'uuid', nullable: true })
  id_docente: string;

  @Column({ type: 'float', nullable: true })
  nota_final: number;

  // FK -> estados_historial_academico: aprobada|reprobada|cancelada
  @Column()
  id_estado: number;

  @Column({ default: 1 })
  numero_intento: number;
}
