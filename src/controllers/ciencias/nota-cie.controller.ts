import { Controller, Get, Param } from '@nestjs/common';
import { NotaCieRepository } from '../../repositories/ciencias/nota-cie.repository';

@Controller('api/ciencias/notas')
export class NotaCieController {
  constructor(private readonly repo: NotaCieRepository) {}

  @Get()
  findAll() {
    return this.repo.findAll();
  }

  // Notas sin nota_final definida aún (útil para el docente)
  @Get('sin-definir')
  findSinDefinir() {
    return this.repo.findSinDefinir();
  }

  @Get('matricula-grupo/:id_mg')
  findByMatriculaGrupo(@Param('id_mg') id: string) {
    return this.repo.findByMatriculaGrupo(id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.repo.findById(id);
  }
}
