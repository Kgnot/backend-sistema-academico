import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

// ─── Interceptor ────────────────────────────────────────────────────────────
import { ResponseInterceptor } from './interceptors/response.interceptor';

// ─── Database providers ──────────────────────────────────────────────────────
import { databaseProviders } from './database/database.providers';

// ─── Repositorios CENTRAL ────────────────────────────────────────────────────
import { PersonaRepository } from './repositories/central/persona.repository';
import { UsuarioRepository } from './repositories/central/usuario.repository';
import { AdministradorRepository } from './repositories/central/administrador.repository';
import { PeriodoAcademicoRepository } from './repositories/central/periodo-academico.repository';
import { LiquidacionRepository } from './repositories/central/liquidacion.repository';
import { PagoRepository } from './repositories/central/pago.repository';
import { HistorialAcademicoRepository } from './repositories/central/historial-academico.repository';

// ─── Repositorios INGENIERÍA ─────────────────────────────────────────────────
import { EstudianteIngRepository } from './repositories/ingenieria/estudiante-ing.repository';
import { DocenteIngRepository } from './repositories/ingenieria/docente-ing.repository';
import { AdministrativoIngRepository } from './repositories/ingenieria/administrativo-ing.repository';
import { AsignaturaIngRepository } from './repositories/ingenieria/asignatura-ing.repository';
import { GrupoIngRepository } from './repositories/ingenieria/grupo-ing.repository';
import { MatriculaIngRepository } from './repositories/ingenieria/matricula-ing.repository';
import { NotaIngRepository } from './repositories/ingenieria/nota-ing.repository';

// ─── Repositorios CIENCIAS ───────────────────────────────────────────────────
import { EstudianteCieRepository } from './repositories/ciencias/estudiante-cie.repository';
import { DocenteCieRepository } from './repositories/ciencias/docente-cie.repository';
import { AdministrativoCieRepository } from './repositories/ciencias/administrativo-cie.repository';
import { AsignaturaCieRepository } from './repositories/ciencias/asignatura-cie.repository';
import { GrupoCieRepository } from './repositories/ciencias/grupo-cie.repository';
import { MatriculaCieRepository } from './repositories/ciencias/matricula-cie.repository';
import { NotaCieRepository } from './repositories/ciencias/nota-cie.repository';

// ─── Repositorios AMBIENTAL ──────────────────────────────────────────────────
import { EstudianteAmbRepository } from './repositories/ambiental/estudiante-amb.repository';
import { DocenteAmbRepository } from './repositories/ambiental/docente-amb.repository';
import { AdministrativoAmbRepository } from './repositories/ambiental/administrativo-amb.repository';
import { AsignaturaAmbRepository } from './repositories/ambiental/asignatura-amb.repository';
import { GrupoAmbRepository } from './repositories/ambiental/grupo-amb.repository';
import { MatriculaAmbRepository } from './repositories/ambiental/matricula-amb.repository';
import { NotaAmbRepository } from './repositories/ambiental/nota-amb.repository';

// ─── Repositorios VISTAS ─────────────────────────────────────────────────────
import { VistasCentralRepository } from './repositories/vistas/vistas-central.repository';
import { VistasIngenieriaRepository } from './repositories/vistas/vistas-ingenieria.repository';
import { VistasAmbientalRepository } from './repositories/vistas/vistas-ambiental.repository';
import { VistasCienciasRepository } from './repositories/vistas/vistas-ciencias.repository';

// ─── Controladores CENTRAL ───────────────────────────────────────────────────
import { PersonaController } from './controllers/central/persona.controller';
import { UsuarioController } from './controllers/central/usuario.controller';
import { AdministradorController } from './controllers/central/administrador.controller';
import { PeriodoAcademicoController } from './controllers/central/periodo.controller';
import { LiquidacionController } from './controllers/central/liquidacion.controller';
import { PagoController } from './controllers/central/pago.controller';
import { HistorialAcademicoController } from './controllers/central/historial-academico.controller';

// ─── Controladores INGENIERÍA ────────────────────────────────────────────────
import { EstudianteIngController } from './controllers/ingenieria/estudiante-ing.controller';
import { DocenteIngController } from './controllers/ingenieria/docente-ing.controller';
import { AdministrativoIngController } from './controllers/ingenieria/administrativo-ing.controller';
import { AsignaturaIngController } from './controllers/ingenieria/asignatura-ing.controller';
import { GrupoIngController } from './controllers/ingenieria/grupo-ing.controller';
import { MatriculaIngController } from './controllers/ingenieria/matricula-ing.controller';
import { NotaIngController } from './controllers/ingenieria/nota-ing.controller';

// ─── Controladores CIENCIAS ──────────────────────────────────────────────────
import { EstudianteCieController } from './controllers/ciencias/estudiante-cie.controller';
import { DocenteCieController } from './controllers/ciencias/docente-cie.controller';
import { AdministrativoCieController } from './controllers/ciencias/administrativo-cie.controller';
import { AsignaturaCieController } from './controllers/ciencias/asignatura-cie.controller';
import { GrupoCieController } from './controllers/ciencias/grupo-cie.controller';
import { MatriculaCieController } from './controllers/ciencias/matricula-cie.controller';
import { NotaCieController } from './controllers/ciencias/nota-cie.controller';

// ─── Controladores AMBIENTAL ─────────────────────────────────────────────────
import { EstudianteAmbController } from './controllers/ambiental/estudiante-amb.controller';
import { DocenteAmbController } from './controllers/ambiental/docente-amb.controller';
import { AdministrativoAmbController } from './controllers/ambiental/administrativo-amb.controller';
import { AsignaturaAmbController } from './controllers/ambiental/asignatura-amb.controller';
import { GrupoAmbController } from './controllers/ambiental/grupo-amb.controller';
import { MatriculaAmbController } from './controllers/ambiental/matricula-amb.controller';
import { NotaAmbController } from './controllers/ambiental/nota-amb.controller';

// ─── Controladores VISTAS ────────────────────────────────────────────────────
import { VistasCentralController } from './controllers/vistas/vistas-central.controller';
import { VistasIngenieriaController } from './controllers/vistas/vistas-ingenieria.controller';
import { VistasCienciasController } from './controllers/vistas/vistas-ciencias.controller';
import { VistasAmbientalController } from './controllers/vistas/vistas-ambiental.controller';
import { CalendarioIngController } from './controllers/ingenieria/calendario-ing.controller';
import { CalendarioCieRepository } from './repositories/ciencias/calendario-cie.repository';
import { CalendarioAmbController } from './controllers/ambiental/calendario-amb.controller';
import { CalendarioAmbRepository } from './repositories/ambiental/calendario-amb.repository';
import { CalendarioIngRepository } from './repositories/ingenieria/calendario-ing.repository';
import { CalendarioCieController } from './controllers/ciencias/calendario-cie.controller';
import { CalendarioDocenteIngController } from './controllers/ingenieria/calendario-docente-ing.controller';
import { CalendarioDocenteCieController } from './controllers/ciencias/calendario-docente-cie.controller';
import { CalendarioDocenteAmbController } from './controllers/ambiental/calendario-docente-amb.controller';
import { CalendarioDocenteIngRepository } from './repositories/ingenieria/calendario-docente-ing.repository';
import { CalendarioDocenteCieRepository } from './repositories/ciencias/calendario-docente-cie.repository';
import { CalendarioDocenteAmbRepository } from './repositories/ambiental/calendario-docente-amb.repository';

@Module({
  providers: [
    // Interceptor global
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },

    // Conexiones a las 4 BDs
    ...databaseProviders,

    // Repos central
    PersonaRepository,
    UsuarioRepository,
    AdministradorRepository,
    PeriodoAcademicoRepository,
    LiquidacionRepository,
    PagoRepository,
    HistorialAcademicoRepository,

    // Repos ingeniería
    EstudianteIngRepository,
    DocenteIngRepository,
    AdministrativoIngRepository,
    AsignaturaIngRepository,
    GrupoIngRepository,
    MatriculaIngRepository,
    NotaIngRepository,
    CalendarioIngRepository,
    CalendarioDocenteIngRepository,

    // Repos ciencias
    EstudianteCieRepository,
    DocenteCieRepository,
    AdministrativoCieRepository,
    AsignaturaCieRepository,
    GrupoCieRepository,
    MatriculaCieRepository,
    NotaCieRepository,
    CalendarioCieRepository,
    CalendarioDocenteCieRepository,

    // Repos ambiental
    EstudianteAmbRepository,
    DocenteAmbRepository,
    AdministrativoAmbRepository,
    AsignaturaAmbRepository,
    GrupoAmbRepository,
    MatriculaAmbRepository,
    NotaAmbRepository,
    CalendarioAmbRepository,
    CalendarioDocenteAmbRepository,

    // Repos vistas
    VistasCentralRepository,
    VistasIngenieriaRepository,
    VistasCienciasRepository,
    VistasAmbientalRepository,
  ],
  controllers: [
    // Central
    PersonaController,
    UsuarioController,
    AdministradorController,
    PeriodoAcademicoController,
    LiquidacionController,
    PagoController,
    HistorialAcademicoController,

    // Ingeniería
    EstudianteIngController,
    DocenteIngController,
    AdministrativoIngController,
    AsignaturaIngController,
    GrupoIngController,
    MatriculaIngController,
    NotaIngController,
    CalendarioIngController,
    CalendarioDocenteIngController,

    // Ciencias
    EstudianteCieController,
    DocenteCieController,
    AdministrativoCieController,
    AsignaturaCieController,
    GrupoCieController,
    MatriculaCieController,
    NotaCieController,
    CalendarioCieController,
    CalendarioDocenteCieController,

    // Ambiental
    EstudianteAmbController,
    DocenteAmbController,
    AdministrativoAmbController,
    AsignaturaAmbController,
    GrupoAmbController,
    MatriculaAmbController,
    NotaAmbController,
    CalendarioAmbController,
    CalendarioDocenteAmbController,

    // Vistas
    VistasCentralController,
    VistasIngenieriaController,
    VistasCienciasController,
    VistasAmbientalController,
  ],
})
export class AppModule {}
