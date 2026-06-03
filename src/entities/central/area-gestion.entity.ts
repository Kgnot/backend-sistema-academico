import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('areas_gestion')
export class AreaGestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;
}
