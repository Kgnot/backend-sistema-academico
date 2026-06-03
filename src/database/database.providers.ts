import { DataSource } from 'typeorm';

// En TypeORM v0.3+ DataSource ya no acepta la propiedad "name".
// La identidad de cada conexión la maneja el token de inyección (provide).

// ─── Conexión CENTRAL ───────────────────────────────────────────────────────
export const centralDataSource = new DataSource({
  type: 'postgres',
  url: 'postgresql://neondb_owner:npg_5ptyYfcsS4Mg@ep-fancy-rain-aqguk5xk-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false },
  entities: [__dirname + '/../entities/central/*.entity{.ts,.js}'],
  synchronize: false,
});

// ─── Conexión FACULTAD DE INGENIERÍA ────────────────────────────────────────
export const ingenieriaDataSource = new DataSource({
  type: 'postgres',
  url: 'postgresql://neondb_owner:npg_JmkQAyZ5I4sj@ep-dawn-union-aqxdp4l0-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false },
  entities: [__dirname + '/../entities/local/*.entity{.ts,.js}'],
  synchronize: false,
});

// ─── Conexión FACULTAD DE CIENCIAS ──────────────────────────────────────────
export const cienciasDataSource = new DataSource({
  type: 'postgres',
  url: 'postgresql://neondb_owner:npg_mLwdj6TBAXK9@ep-nameless-cherry-aqx9jx0v-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false },
  entities: [__dirname + '/../entities/local/*.entity{.ts,.js}'],
  synchronize: false,
});

// ─── Conexión FACULTAD AMBIENTAL ─────────────────────────────────────────────
export const ambientalDataSource = new DataSource({
  type: 'postgres',
  url: 'postgresql://neondb_owner:npg_wsvr60oIQElx@ep-dawn-hill-apxs1kyt-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false },
  entities: [__dirname + '/../entities/local/*.entity{.ts,.js}'],
  synchronize: false,
});

// ─── Providers para inyección en el módulo ──────────────────────────────────
export const databaseProviders = [
  {
    provide: 'CENTRAL_DATA_SOURCE',
    useFactory: async () => centralDataSource.initialize(),
  },
  {
    provide: 'INGENIERIA_DATA_SOURCE',
    useFactory: async () => ingenieriaDataSource.initialize(),
  },
  {
    provide: 'CIENCIAS_DATA_SOURCE',
    useFactory: async () => cienciasDataSource.initialize(),
  },
  {
    provide: 'AMBIENTAL_DATA_SOURCE',
    useFactory: async () => ambientalDataSource.initialize(),
  },
];
