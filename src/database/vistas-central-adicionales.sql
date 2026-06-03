-- ============================================================
-- VISTAS ADICIONALES - Nodo CENTRAL (versión corregida)
-- Se hace DROP explícito antes de cada vista para evitar
-- el error "cannot change name of view column" de PostgreSQL.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS dblink;

-- ------------------------------------------------------------
-- 1) VISTA CONSOLIDADA DE DOCENTES (los 3 nodos)
-- ------------------------------------------------------------
DROP VIEW IF EXISTS v_docentes_institucional;

CREATE VIEW v_docentes_institucional AS

SELECT
    d.id_docente,
    d.persona_id,
    d.categoria,
    d.salario_actual,
    d.id_estado,
    tv.nombre  AS tipo_vinculacion,
    f.nombre   AS facultad,
    'Ingeniería'::varchar AS nodo
FROM dblink(
             'host=ep-dawn-union-aqxdp4l0-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_JmkQAyZ5I4sj sslmode=require',
             'SELECT id_docente, persona_id, categoria, salario_actual, id_estado, id_tipo_vinculacion, id_facultad FROM docentes'
     ) AS d(id_docente uuid, persona_id uuid, categoria varchar, salario_actual float,
            id_estado int, id_tipo_vinculacion int, id_facultad uuid)
         JOIN dblink(
        'host=ep-dawn-union-aqxdp4l0-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_JmkQAyZ5I4sj sslmode=require',
        'SELECT id, nombre FROM tipos_vinculacion'
              ) AS tv(id int, nombre varchar) ON tv.id = d.id_tipo_vinculacion
         JOIN dblink(
        'host=ep-dawn-union-aqxdp4l0-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_JmkQAyZ5I4sj sslmode=require',
        'SELECT id_facultad, nombre FROM facultades'
              ) AS f(id_facultad uuid, nombre varchar) ON f.id_facultad = d.id_facultad

UNION ALL

SELECT
    d.id_docente, d.persona_id, d.categoria, d.salario_actual, d.id_estado,
    tv.nombre, f.nombre, 'Ciencias'::varchar
FROM dblink(
             'host=ep-nameless-cherry-aqx9jx0v-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_mLwdj6TBAXK9 sslmode=require',
             'SELECT id_docente, persona_id, categoria, salario_actual, id_estado, id_tipo_vinculacion, id_facultad FROM docentes'
     ) AS d(id_docente uuid, persona_id uuid, categoria varchar, salario_actual float,
            id_estado int, id_tipo_vinculacion int, id_facultad uuid)
         JOIN dblink(
        'host=ep-nameless-cherry-aqx9jx0v-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_mLwdj6TBAXK9 sslmode=require',
        'SELECT id, nombre FROM tipos_vinculacion'
              ) AS tv(id int, nombre varchar) ON tv.id = d.id_tipo_vinculacion
         JOIN dblink(
        'host=ep-nameless-cherry-aqx9jx0v-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_mLwdj6TBAXK9 sslmode=require',
        'SELECT id_facultad, nombre FROM facultades'
              ) AS f(id_facultad uuid, nombre varchar) ON f.id_facultad = d.id_facultad

UNION ALL

SELECT
    d.id_docente, d.persona_id, d.categoria, d.salario_actual, d.id_estado,
    tv.nombre, f.nombre, 'Ambiental'::varchar
FROM dblink(
             'host=ep-dawn-hill-apxs1kyt-pooler.c-7.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_wsvr60oIQElx sslmode=require',
             'SELECT id_docente, persona_id, categoria, salario_actual, id_estado, id_tipo_vinculacion, id_facultad FROM docentes'
     ) AS d(id_docente uuid, persona_id uuid, categoria varchar, salario_actual float,
            id_estado int, id_tipo_vinculacion int, id_facultad uuid)
         JOIN dblink(
        'host=ep-dawn-hill-apxs1kyt-pooler.c-7.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_wsvr60oIQElx sslmode=require',
        'SELECT id, nombre FROM tipos_vinculacion'
              ) AS tv(id int, nombre varchar) ON tv.id = d.id_tipo_vinculacion
         JOIN dblink(
        'host=ep-dawn-hill-apxs1kyt-pooler.c-7.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_wsvr60oIQElx sslmode=require',
        'SELECT id_facultad, nombre FROM facultades'
              ) AS f(id_facultad uuid, nombre varchar) ON f.id_facultad = d.id_facultad;


-- ------------------------------------------------------------
-- 2) VISTA CONSOLIDADA DE ADMINISTRATIVOS (los 3 nodos)
-- ------------------------------------------------------------
DROP VIEW IF EXISTS v_administrativos_institucional;

CREATE VIEW v_administrativos_institucional AS

SELECT
    a.id_administrativo,
    a.persona_id,
    c.nombre   AS cargo,
    tv.nombre  AS tipo_vinculacion,
    f.nombre   AS facultad,
    'Ingeniería'::varchar AS nodo
FROM dblink(
             'host=ep-dawn-union-aqxdp4l0-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_JmkQAyZ5I4sj sslmode=require',
             'SELECT id_administrativo, persona_id, id_cargo, id_tipo_vinculacion, id_facultad FROM administrativos'
     ) AS a(id_administrativo uuid, persona_id uuid, id_cargo int, id_tipo_vinculacion int, id_facultad uuid)
         JOIN dblink(
        'host=ep-dawn-union-aqxdp4l0-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_JmkQAyZ5I4sj sslmode=require',
        'SELECT id, nombre FROM cargos_administrativo'
              ) AS c(id int, nombre varchar) ON c.id = a.id_cargo
         JOIN dblink(
        'host=ep-dawn-union-aqxdp4l0-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_JmkQAyZ5I4sj sslmode=require',
        'SELECT id, nombre FROM tipos_vinculacion'
              ) AS tv(id int, nombre varchar) ON tv.id = a.id_tipo_vinculacion
         JOIN dblink(
        'host=ep-dawn-union-aqxdp4l0-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_JmkQAyZ5I4sj sslmode=require',
        'SELECT id_facultad, nombre FROM facultades'
              ) AS f(id_facultad uuid, nombre varchar) ON f.id_facultad = a.id_facultad

UNION ALL

SELECT
    a.id_administrativo, a.persona_id,
    c.nombre, tv.nombre, f.nombre, 'Ciencias'::varchar
FROM dblink(
             'host=ep-nameless-cherry-aqx9jx0v-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_mLwdj6TBAXK9 sslmode=require',
             'SELECT id_administrativo, persona_id, id_cargo, id_tipo_vinculacion, id_facultad FROM administrativos'
     ) AS a(id_administrativo uuid, persona_id uuid, id_cargo int, id_tipo_vinculacion int, id_facultad uuid)
         JOIN dblink(
        'host=ep-nameless-cherry-aqx9jx0v-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_mLwdj6TBAXK9 sslmode=require',
        'SELECT id, nombre FROM cargos_administrativo'
              ) AS c(id int, nombre varchar) ON c.id = a.id_cargo
         JOIN dblink(
        'host=ep-nameless-cherry-aqx9jx0v-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_mLwdj6TBAXK9 sslmode=require',
        'SELECT id, nombre FROM tipos_vinculacion'
              ) AS tv(id int, nombre varchar) ON tv.id = a.id_tipo_vinculacion
         JOIN dblink(
        'host=ep-nameless-cherry-aqx9jx0v-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_mLwdj6TBAXK9 sslmode=require',
        'SELECT id_facultad, nombre FROM facultades'
              ) AS f(id_facultad uuid, nombre varchar) ON f.id_facultad = a.id_facultad

UNION ALL

SELECT
    a.id_administrativo, a.persona_id,
    c.nombre, tv.nombre, f.nombre, 'Ambiental'::varchar
FROM dblink(
             'host=ep-dawn-hill-apxs1kyt-pooler.c-7.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_wsvr60oIQElx sslmode=require',
             'SELECT id_administrativo, persona_id, id_cargo, id_tipo_vinculacion, id_facultad FROM administrativos'
     ) AS a(id_administrativo uuid, persona_id uuid, id_cargo int, id_tipo_vinculacion int, id_facultad uuid)
         JOIN dblink(
        'host=ep-dawn-hill-apxs1kyt-pooler.c-7.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_wsvr60oIQElx sslmode=require',
        'SELECT id, nombre FROM cargos_administrativo'
              ) AS c(id int, nombre varchar) ON c.id = a.id_cargo
         JOIN dblink(
        'host=ep-dawn-hill-apxs1kyt-pooler.c-7.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_wsvr60oIQElx sslmode=require',
        'SELECT id, nombre FROM tipos_vinculacion'
              ) AS tv(id int, nombre varchar) ON tv.id = a.id_tipo_vinculacion
         JOIN dblink(
        'host=ep-dawn-hill-apxs1kyt-pooler.c-7.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_wsvr60oIQElx sslmode=require',
        'SELECT id_facultad, nombre FROM facultades'
              ) AS f(id_facultad uuid, nombre varchar) ON f.id_facultad = a.id_facultad;


-- ------------------------------------------------------------
-- 3) VISTA: promedio de notas por facultad
-- ------------------------------------------------------------
DROP VIEW IF EXISTS v_promedio_notas_por_facultad;

CREATE VIEW v_promedio_notas_por_facultad AS

SELECT 'Ingeniería'::varchar AS facultad, round(avg(t.nota_final)::numeric, 2) AS promedio
FROM dblink(
             'host=ep-dawn-union-aqxdp4l0-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_JmkQAyZ5I4sj sslmode=require',
             'SELECT nota_final FROM notas WHERE nota_final IS NOT NULL'
     ) AS t(nota_final float)

UNION ALL

SELECT 'Ciencias'::varchar, round(avg(t.nota_final)::numeric, 2)
FROM dblink(
             'host=ep-nameless-cherry-aqx9jx0v-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_mLwdj6TBAXK9 sslmode=require',
             'SELECT nota_final FROM notas WHERE nota_final IS NOT NULL'
     ) AS t(nota_final float)

UNION ALL

SELECT 'Ambiental'::varchar, round(avg(t.nota_final)::numeric, 2)
FROM dblink(
             'host=ep-dawn-hill-apxs1kyt-pooler.c-7.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_wsvr60oIQElx sslmode=require',
             'SELECT nota_final FROM notas WHERE nota_final IS NOT NULL'
     ) AS t(nota_final float);

--  LOGIN :

-- ============================================================
-- VISTA DE LOGIN UNIFICADO - Nodo CENTRAL
-- Ejecutar en la BD central.
-- Resuelve: correo → { rol, facultad, identificador, detalle }
-- El backend hace una sola query:
--   SELECT * FROM v_login_unificado WHERE correo = $1
-- ============================================================

CREATE EXTENSION IF NOT EXISTS dblink;

DROP VIEW IF EXISTS v_login_unificado;

CREATE VIEW v_login_unificado AS

-- ── 1) ADMINISTRADOR CENTRAL ─────────────────────────────────────────────────
SELECT
    u.persona_id,
    u.correo,
    u.contrasena_hash,
    'administrador'::varchar     AS rol,
    'central'::varchar           AS facultad,
    a.id_administrador::varchar  AS identificador,
    ag.nombre                    AS detalle
FROM usuarios u
         JOIN administradores a ON a.persona_id = u.persona_id
         JOIN areas_gestion ag  ON ag.id = a.id_area_gestion

UNION ALL

-- ── 2) ESTUDIANTES - INGENIERÍA ──────────────────────────────────────────────
SELECT
    u.persona_id, u.correo, u.contrasena_hash,
    'estudiante'::varchar, 'ingenieria'::varchar,
    e.cod_estudiante, e.nombre_programa
FROM usuarios u
         JOIN dblink(
        'host=ep-dawn-union-aqxdp4l0-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_JmkQAyZ5I4sj sslmode=require',
        'SELECT e.persona_id, e.cod_estudiante, p.nombre_programa
         FROM estudiantes e JOIN programas_academicos p ON p.id_programa = e.id_programa'
              ) AS e(persona_id uuid, cod_estudiante varchar, nombre_programa varchar)
              ON e.persona_id = u.persona_id

UNION ALL

-- ── 3) DOCENTES - INGENIERÍA ─────────────────────────────────────────────────
SELECT
    u.persona_id, u.correo, u.contrasena_hash,
    'docente'::varchar, 'ingenieria'::varchar,
    d.id_docente, d.categoria
FROM usuarios u
         JOIN dblink(
        'host=ep-dawn-union-aqxdp4l0-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_JmkQAyZ5I4sj sslmode=require',
        'SELECT persona_id, id_docente::varchar, categoria FROM docentes'
              ) AS d(persona_id uuid, id_docente varchar, categoria varchar)
              ON d.persona_id = u.persona_id

UNION ALL

-- ── 4) ADMINISTRATIVOS - INGENIERÍA ──────────────────────────────────────────
SELECT
    u.persona_id, u.correo, u.contrasena_hash,
    'administrativo'::varchar, 'ingenieria'::varchar,
    a.id_administrativo, a.cargo
FROM usuarios u
         JOIN dblink(
        'host=ep-dawn-union-aqxdp4l0-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_JmkQAyZ5I4sj sslmode=require',
        'SELECT a.persona_id, a.id_administrativo::varchar, c.nombre AS cargo
         FROM administrativos a JOIN cargos_administrativo c ON c.id = a.id_cargo'
              ) AS a(persona_id uuid, id_administrativo varchar, cargo varchar)
              ON a.persona_id = u.persona_id

UNION ALL

-- ── 5) ESTUDIANTES - CIENCIAS ────────────────────────────────────────────────
SELECT
    u.persona_id, u.correo, u.contrasena_hash,
    'estudiante'::varchar, 'ciencias'::varchar,
    e.cod_estudiante, e.nombre_programa
FROM usuarios u
         JOIN dblink(
        'host=ep-nameless-cherry-aqx9jx0v-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_mLwdj6TBAXK9 sslmode=require',
        'SELECT e.persona_id, e.cod_estudiante, p.nombre_programa
         FROM estudiantes e JOIN programas_academicos p ON p.id_programa = e.id_programa'
              ) AS e(persona_id uuid, cod_estudiante varchar, nombre_programa varchar)
              ON e.persona_id = u.persona_id

UNION ALL

-- ── 6) DOCENTES - CIENCIAS ───────────────────────────────────────────────────
SELECT
    u.persona_id, u.correo, u.contrasena_hash,
    'docente'::varchar, 'ciencias'::varchar,
    d.id_docente, d.categoria
FROM usuarios u
         JOIN dblink(
        'host=ep-nameless-cherry-aqx9jx0v-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_mLwdj6TBAXK9 sslmode=require',
        'SELECT persona_id, id_docente::varchar, categoria FROM docentes'
              ) AS d(persona_id uuid, id_docente varchar, categoria varchar)
              ON d.persona_id = u.persona_id

UNION ALL

-- ── 7) ADMINISTRATIVOS - CIENCIAS ────────────────────────────────────────────
SELECT
    u.persona_id, u.correo, u.contrasena_hash,
    'administrativo'::varchar, 'ciencias'::varchar,
    a.id_administrativo, a.cargo
FROM usuarios u
         JOIN dblink(
        'host=ep-nameless-cherry-aqx9jx0v-pooler.c-8.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_mLwdj6TBAXK9 sslmode=require',
        'SELECT a.persona_id, a.id_administrativo::varchar, c.nombre AS cargo
         FROM administrativos a JOIN cargos_administrativo c ON c.id = a.id_cargo'
              ) AS a(persona_id uuid, id_administrativo varchar, cargo varchar)
              ON a.persona_id = u.persona_id

UNION ALL

-- ── 8) ESTUDIANTES - AMBIENTAL ───────────────────────────────────────────────
SELECT
    u.persona_id, u.correo, u.contrasena_hash,
    'estudiante'::varchar, 'ambiental'::varchar,
    e.cod_estudiante, e.nombre_programa
FROM usuarios u
         JOIN dblink(
        'host=ep-dawn-hill-apxs1kyt-pooler.c-7.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_wsvr60oIQElx sslmode=require',
        'SELECT e.persona_id, e.cod_estudiante, p.nombre_programa
         FROM estudiantes e JOIN programas_academicos p ON p.id_programa = e.id_programa'
              ) AS e(persona_id uuid, cod_estudiante varchar, nombre_programa varchar)
              ON e.persona_id = u.persona_id

UNION ALL

-- ── 9) DOCENTES - AMBIENTAL ──────────────────────────────────────────────────
SELECT
    u.persona_id, u.correo, u.contrasena_hash,
    'docente'::varchar, 'ambiental'::varchar,
    d.id_docente, d.categoria
FROM usuarios u
         JOIN dblink(
        'host=ep-dawn-hill-apxs1kyt-pooler.c-7.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_wsvr60oIQElx sslmode=require',
        'SELECT persona_id, id_docente::varchar, categoria FROM docentes'
              ) AS d(persona_id uuid, id_docente varchar, categoria varchar)
              ON d.persona_id = u.persona_id

UNION ALL

-- ── 10) ADMINISTRATIVOS - AMBIENTAL ──────────────────────────────────────────
SELECT
    u.persona_id, u.correo, u.contrasena_hash,
    'administrativo'::varchar, 'ambiental'::varchar,
    a.id_administrativo, a.cargo
FROM usuarios u
         JOIN dblink(
        'host=ep-dawn-hill-apxs1kyt-pooler.c-7.us-east-1.aws.neon.tech dbname=neondb user=neondb_owner password=npg_wsvr60oIQElx sslmode=require',
        'SELECT a.persona_id, a.id_administrativo::varchar, c.nombre AS cargo
         FROM administrativos a JOIN cargos_administrativo c ON c.id = a.id_cargo'
              ) AS a(persona_id uuid, id_administrativo varchar, cargo varchar)
              ON a.persona_id = u.persona_id;