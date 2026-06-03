import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Pago } from '../../entities/central/pago.entity';

@Injectable()
export class PagoRepository {
  constructor(
    @Inject('CENTRAL_DATA_SOURCE') private readonly ds: DataSource,
  ) {}

  findAll() {
    return this.ds.getRepository(Pago).find();
  }

  findById(id: string) {
    return this.ds.getRepository(Pago).findOneBy({ id });
  }

  // Pagos de una liquidación
  findByLiquidacion(id_liquidacion: string) {
    return this.ds.getRepository(Pago).findBy({ id_liquidacion });
  }

  // Pagos aprobados (id_estado = 2)
  findAprobados() {
    return this.ds.getRepository(Pago).findBy({ id_estado: 2 });
  }

  // Pagos por tipo (PSE, consignación, etc.)
  findByTipo(id_tipo_pago: number) {
    return this.ds.getRepository(Pago).findBy({ id_tipo_pago });
  }
}
