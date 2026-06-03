import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('programas_academicos')
export class ProgramaAcademico {
  @PrimaryColumn('uuid')
  id_programa: string;

  @Column('uuid')
  id_facultad: string;

  @Column()
  nombre_programa: string;

  // presencial | virtual | distancia
  @Column({ nullable: true })
  modalidad: string;

  // tecnico | tecnologo | profesional | especializacion
  @Column({ nullable: true })
  nivel_formacion: string;

  // activo | inactivo
  @Column({ nullable: true })
  estado: string;
}
