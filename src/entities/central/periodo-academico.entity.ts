import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('periodos_academicos')
export class PeriodoAcademico {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ type: 'date', nullable: true })
  fecha_inicio: string;

  @Column({ type: 'date', nullable: true })
  fecha_fin: string;

  // FK -> estados_periodo: 1=planeado, 2=activo, 3=cerrado
  @Column()
  id_estado: number;
}
