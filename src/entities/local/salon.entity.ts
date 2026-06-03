import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('salones')
export class Salon {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  nombre: string;
}
