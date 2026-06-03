import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('liquidaciones')
export class Liquidacion {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  cod_estudiante: string;

  @Column('uuid')
  id_periodo: string;

  @Column({ type: 'date', nullable: true })
  fecha_generacion: string;

  @Column({ type: 'float', nullable: true })
  total: number;

  // FK -> estados_liquidacion: generada|pagada|parcial|anulada|vencida
  @Column()
  id_estado: number;
}
