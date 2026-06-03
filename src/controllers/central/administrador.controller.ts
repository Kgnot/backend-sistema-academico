import { Controller, Get, Param, Query } from '@nestjs/common';
import { AdministradorRepository } from '../../repositories/central/administrador.repository';

@Controller('api/administrador/central')
export class AdministradorController {
  constructor(private readonly repo: AdministradorRepository) {}

  @Get()
  findAll() {
    return this.repo.findAll();
  }

  @Get('area/:id_area')
  findByArea(@Param('id_area') id: string) {
    return this.repo.findByArea(parseInt(id));
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.repo.findById(id);
  }

  @Get('persona/:persona_id')
  findByPersona(@Param('persona_id') id: string) {
    return this.repo.findByPersonaId(id);
  }
}
