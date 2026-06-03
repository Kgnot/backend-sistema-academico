-- ============================================================
-- VISTAS LOCALES - FACULTAD DE INGENIERÍA
-- Ejecutar ÚNICAMENTE en el nodo de Ingeniería:
-- postgresql://neondb_owner:npg_JmkQAyZ5I4sj@ep-dawn-union-aqxdp4l0-pooler...
-- ============================================================

CREATE EXTENSION IF NOT EXISTS dblink;

-- Cadena al nodo CENTRAL (donde viven personas y usuarios)
-- Para Ingeniería el nodo central es el mismo host, distinta base lógica de roles.
-- Ajusta si tu central está en otro host.

-- ------------------------------------------------------------
-- 1) LOGIN ESTUDIANTE
-- ------------------------------------------------------------
DROP VIEW IF EXISTS v_login_estudiante;

CREATE VIEW v_login_estudiante AS
SELECT
  u.persona_id,
  u.correo,
  u.contrasena_hash,
  e.cod_estudiante,
  e.id_programa,
  e.id_estado,
  p.nombre_programa,
  f.nombre AS facultad
FROM estudiantes e
JOIN programas_academicos p ON p.id_programa = e.id_programa
JOIN facultades f            ON f.id_facultad = p.id_facultad
JOIN dblink(
  '''host=ep-fancy-rain-aqguk5xk-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_5ptyYfcsS4Mg sslmode=require''',
  'SELECT persona_id, correo, contrasena_hash FROM usuarios'
) AS u(persona_id uuid, correo varchar, contrasena_hash varchar)
  ON u.persona_id = e.persona_id;

-- ------------------------------------------------------------
-- 2) LOGIN DOCENTE
-- ------------------------------------------------------------
DROP VIEW IF EXISTS v_login_docente;

CREATE VIEW v_login_docente AS
SELECT
  u.persona_id,
  u.correo,
  u.contrasena_hash,
  d.id_docente,
  d.id_facultad,
  d.categoria,
  d.id_tipo_vinculacion,
  d.id_estado,
  f.nombre AS facultad
FROM docentes d
JOIN facultades f ON f.id_facultad = d.id_facultad
JOIN dblink(
  'host=ep-fancy-rain-aqguk5xk-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_5ptyYfcsS4Mg sslmode=require',
  'SELECT persona_id, correo, contrasena_hash FROM usuarios'
) AS u(persona_id uuid, correo varchar, contrasena_hash varchar)
  ON u.persona_id = d.persona_id;

-- ------------------------------------------------------------
-- 3) LOGIN ADMINISTRATIVO
-- ------------------------------------------------------------
DROP VIEW IF EXISTS v_login_administrativo;

CREATE VIEW v_login_administrativo AS
SELECT
  u.persona_id,
  u.correo,
  u.contrasena_hash,
  a.id_administrativo,
  a.id_facultad,
  a.id_cargo,
  a.id_tipo_vinculacion,
  c.nombre AS cargo,
  f.nombre AS facultad
FROM administrativos a
JOIN facultades f             ON f.id_facultad = a.id_facultad
JOIN cargos_administrativo c  ON c.id = a.id_cargo
JOIN dblink(
        'host=ep-fancy-rain-aqguk5xk-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_5ptyYfcsS4Mg sslmode=require',
  'SELECT persona_id, correo, contrasena_hash FROM usuarios'
) AS u(persona_id uuid, correo varchar, contrasena_hash varchar)
  ON u.persona_id = a.persona_id;

-- ------------------------------------------------------------
-- 4) PERFIL ESTUDIANTE
-- ------------------------------------------------------------
DROP VIEW IF EXISTS v_perfil_estudiante;

CREATE VIEW v_perfil_estudiante AS
SELECT
  e.cod_estudiante,
  e.id_programa,
  e.id_estado,
  p.nombre_programa,
  p.modalidad,
  p.nivel_formacion,
  f.nombre           AS facultad,
  pers.nombres,
  pers.apellidos,
  pers.num_documento,
  pers.tipo_documento,
  pers.telefono
FROM estudiantes e
JOIN programas_academicos p ON p.id_programa = e.id_programa
JOIN facultades f            ON f.id_facultad = p.id_facultad
JOIN dblink(
        'host=ep-fancy-rain-aqguk5xk-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_5ptyYfcsS4Mg sslmode=require',
  'SELECT persona_id, nombres, apellidos, num_documento, tipo_documento, telefono FROM personas'
) AS pers(persona_id uuid, nombres varchar, apellidos varchar, num_documento varchar, tipo_documento varchar, telefono varchar)
  ON pers.persona_id = e.persona_id;

-- ------------------------------------------------------------
-- 5) PERFIL DOCENTE
-- ------------------------------------------------------------
DROP VIEW IF EXISTS v_perfil_docente;

CREATE VIEW v_perfil_docente AS
SELECT
  d.id_docente,
  d.categoria,
  d.salario_actual,
  d.id_estado,
  d.id_tipo_vinculacion,
  tv.nombre          AS tipo_vinculacion,
  f.nombre           AS facultad,
  pers.nombres,
  pers.apellidos,
  pers.num_documento,
  pers.telefono
FROM docentes d
JOIN facultades f         ON f.id_facultad = d.id_facultad
JOIN tipos_vinculacion tv ON tv.id = d.id_tipo_vinculacion
JOIN dblink(
        'host=ep-fancy-rain-aqguk5xk-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_5ptyYfcsS4Mg sslmode=require',
  'SELECT persona_id, nombres, apellidos, num_documento, telefono FROM personas'
) AS pers(persona_id uuid, nombres varchar, apellidos varchar, num_documento varchar, telefono varchar)
  ON pers.persona_id = d.persona_id;
