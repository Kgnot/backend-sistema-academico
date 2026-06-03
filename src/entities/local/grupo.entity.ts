import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('grupos')
export class Grupo {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  id_asignatura: string;

  // FK lógica -> periodos_academicos.id (CENTRAL)
  @Column('uuid')
  id_periodo: string;

  @Column()
  numero_grupo: number;

  @Column()
  cupo_maximo: number;

  // NULL = sin docente asignado aún
  @Column({ type: 'uuid', nullable: true })
  id_docente: string;

  // FK -> estados_grupo: abierto|cerrado|cancelado
  @Column()
  id_estado: number;
}
