import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('matriculas')
export class Matricula {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  cod_estudiante: string;

  // FK lógica -> periodos_academicos.id (CENTRAL)
  @Column('uuid')
  id_periodo: string;

  // FK lógica -> liquidaciones.id (CENTRAL)
  @Column({ type: 'uuid', nullable: true })
  id_liquidacion: string;

  @Column({ type: 'date', nullable: true })
  fecha_matricula: string;

  // FK -> estados_matricula: activa|cancelada|finalizada
  @Column()
  id_estado: number;
}
