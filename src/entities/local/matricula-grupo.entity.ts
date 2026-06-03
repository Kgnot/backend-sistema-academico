import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('matriculas_grupos')
export class MatriculaGrupo {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  id_matricula: string;

  @Column('uuid')
  id_grupo: string;

  // FK -> estados_matricula_grupo: cursando|aprobado|reprobado
  @Column()
  id_estado: number;
}
