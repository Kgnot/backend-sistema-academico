import { Controller, Get, Param } from '@nestjs/common';
import { PagoRepository } from '../../repositories/central/pago.repository';

@Controller('api/central/pagos')
export class PagoController {
  constructor(private readonly repo: PagoRepository) {}

  @Get()
  findAll() {
    return this.repo.findAll();
  }

  // Pagos aprobados (módulo administrador financiero)
  @Get('aprobados')
  findAprobados() {
    return this.repo.findAprobados();
  }

  @Get('tipo/:id_tipo')
  findByTipo(@Param('id_tipo') id: string) {
    return this.repo.findByTipo(parseInt(id));
  }

  @Get('liquidacion/:id_liquidacion')
  findByLiquidacion(@Param('id_liquidacion') id: string) {
    return this.repo.findByLiquidacion(id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.repo.findById(id);
  }
}
