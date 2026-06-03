import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Liquidacion } from '../../entities/central/liquidacion.entity';

@Injectable()
export class LiquidacionRepository {
  constructor(
    @Inject('CENTRAL_DATA_SOURCE') private readonly ds: DataSource,
  ) {}

  findAll() {
    return this.ds.getRepository(Liquidacion).find();
  }

  findById(id: string) {
    return this.ds.getRepository(Liquidacion).findOneBy({ id });
  }

  // Liquidaciones de un estudiante específico
  findByEstudiante(cod_estudiante: string) {
    return this.ds.getRepository(Liquidacion).findBy({ cod_estudiante });
  }

  // Liquidación de un estudiante en un periodo
  findByEstudianteYPeriodo(cod_estudiante: string, id_periodo: string) {
    return this.ds
      .getRepository(Liquidacion)
      .findOneBy({ cod_estudiante, id_periodo });
  }

  // Liquidaciones pendientes o con deuda (estados: generada=1, parcial=3, vencida=5)
  async findPendientes() {
    return this.ds
      .getRepository(Liquidacion)
      .createQueryBuilder('l')
      .where('l.id_estado IN (:...estados)', { estados: [1, 3, 5] })
      .getMany();
  }
}
