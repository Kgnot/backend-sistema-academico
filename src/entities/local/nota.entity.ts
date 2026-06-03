import { Entity, PrimaryColumn, Column } from 'typeorm';

// Una fila por asignatura cursada. nota_final la calcula un trigger en BD.
@Entity('notas')
export class Nota {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', { unique: true })
  id_matricula_grupo: string;

  // Cada corte 0.0-5.0; pesos: 35%, 35%, 30%
  @Column({ type: 'float', nullable: true })
  corte1: number;

  @Column({ type: 'float', nullable: true })
  corte2: number;

  @Column({ type: 'float', nullable: true })
  corte3: number;

  @Column({ type: 'float', nullable: true })
  nota_final: number;
}
