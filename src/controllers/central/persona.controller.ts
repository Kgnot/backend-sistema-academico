import { Controller, Get, Param, Query } from '@nestjs/common';
import { PersonaRepository } from '../../repositories/central/persona.repository';

@Controller('api/central/personas')
export class PersonaController {
  constructor(private readonly repo: PersonaRepository) {}

  @Get()
  findAll() {
    return this.repo.findAll();
  }

  @Get('search')
  search(@Query('q') termino: string) {
    return this.repo.searchByNombre(termino);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.repo.findById(id);
  }

  @Get('documento/:tipo/:num')
  findByDocumento(@Param('tipo') tipo: string, @Param('num') num: string) {
    return this.repo.findByDocumento(tipo, num);
  }
}
