import {
  Controller, Get, Patch,
  Param, Query, Body, BadRequestException,
} from '@nestjs/common';
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

  @Get('documento/:tipo/:num')
  findByDocumento(@Param('tipo') tipo: string, @Param('num') num: string) {
    return this.repo.findByDocumento(tipo, num);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.repo.findById(id);
  }

  // PATCH /api/central/personas/:id/contacto
  // Permite al estudiante actualizar telefono y/o direccion.
  // Campos protegidos (correo, documento, nombres) no están expuestos.
  @Patch(':id/contacto')
  updateContacto(
    @Param('id') id: string,
    @Body() body: { telefono?: string; direccion?: string },
  ) {
    if (!body.telefono && !body.direccion) {
      throw new BadRequestException('Envía al menos telefono o direccion');
    }
    return this.repo.updateContacto(id, body);
  }
}