import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('horarios')
export class Horario {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  id_grupo: string;

  // lunes|martes|miercoles|jueves|viernes|sabado|domingo
  @Column({ nullable: true })
  dia_semana: string;

  @Column({ type: 'time', nullable: true })
  hora_inicio: string;

  @Column({ type: 'time', nullable: true })
  hora_fin: string;

  @Column('uuid')
  id_salon: string;
}
