import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('pagos')
export class Pago {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  id_liquidacion: string;

  @Column()
  id_tipo_pago: number;

  @Column({ type: 'date', nullable: true })
  fecha_pago: string;

  @Column('float')
  monto: number;

  @Column({ nullable: true })
  referencia: string;

  // FK -> estados_pago: pendiente|aprobado|rechazado|reversado
  @Column()
  id_estado: number;
}
