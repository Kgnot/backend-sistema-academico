import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuarioRepository } from '../../repositories/central/usuario.repository';

@Controller('api/auth')
export class UsuarioController {
  constructor(private readonly usuarioRepo: UsuarioRepository) {}

  // Login unificado: una sola llamada resuelve correo → rol + facultad
  @Post('login')
  async login(@Body() body: { correo: string; contrasena_hash: string }) {
    const resultado = await this.usuarioRepo.findLoginUnificado(body.correo);

    if (!resultado) {
      throw new NotFoundException('Usuario no encontrado en ningún nodo');
    }

    if (resultado.contrasena_hash !== body.contrasena_hash) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    await this.usuarioRepo.actualizarUltimoAcceso(resultado.persona_id);

    // Devolver todo lo necesario para que el frontend sepa a qué módulo ir
    return {
      persona_id: resultado.persona_id,
      correo: resultado.correo,
      rol: resultado.rol, // estudiante | docente | administrativo | administrador
      facultad: resultado.facultad, // ingenieria | ciencias | ambiental | central
      identificador: resultado.identificador, // cod_estudiante, id_docente, id_administrativo o id_administrador
      detalle: resultado.detalle, // nombre_programa, categoria, cargo o area_gestion
    };
  }

  @Get('usuario/:persona_id')
  findByPersonaId(@Param('persona_id') id: string) {
    return this.usuarioRepo.findByPersonaId(id);
  }
}
