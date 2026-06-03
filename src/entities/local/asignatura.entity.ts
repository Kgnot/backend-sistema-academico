import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('asignaturas')
export class Asignatura {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  codigo: string;

  @Column()
  nombre: string;

  @Column('uuid')
  id_programa: string;

  @Column()
  creditos: number;

  @Column({ nullable: true })
  horas_teoricas: number;

  @Column({ nullable: true })
  horas_practicas: number;

  @Column({ nullable: true })
  semestre_sugerido: number;

  // FK -> estados_asignatura: activa|inactiva|en_revision|obsoleta
  @Column()
  id_estado: number;
}
