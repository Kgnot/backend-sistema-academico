import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Envuelve todas las respuestas en un sobre estándar { ok, data } o { ok, error }
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({ ok: true, data })),
      catchError((err) => {
        const status = err instanceof HttpException ? err.getStatus() : 500;
        const message = err?.message || 'Error interno del servidor';
        context.switchToHttp().getResponse().status(status);
        return throwError(() => ({ ok: false, error: message, status }));
      }),
    );
  }
}
