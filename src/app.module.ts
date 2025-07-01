import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MetricasModule } from './metricas/metricas.module';
import { MetricasMiddleware } from './middlewares/metricas/metricas.middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConficReservas } from './providers/database_reservas';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { AutenticacionMiddleware } from './middlewares/autenticacion/autenticacion.middleware';
import { UsuariosController } from './usuarios/usuarios.controller';
import { EspecialidadesController } from './especialidades/especialidades.controller';
import { PersonasModule } from './personas/personas.module';
import { PersonasController } from './personas/personas.controller';
import { MedicoModule } from './medico/medico.module';
import { MedicoController } from './medico/medico.controller';
import { PacientesModule } from './pacientes/pacientes.module';
import { PacientesController } from './pacientes/pacientes.controller';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConficReservas }),
    UsuariosModule, MetricasModule, EspecialidadesModule, AutenticacionModule, PersonasModule, MedicoModule, PacientesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure (consumer: MiddlewareConsumer){
    consumer.apply(MetricasMiddleware).forRoutes('*');
    consumer.apply(AutenticacionMiddleware).exclude(
      'autenticacion/(.*)',
      'metricas/(.*)',
      {
        path: 'especialidad/publicos',
        method: RequestMethod.GET
      }
    ).forRoutes(
      UsuariosController,
      EspecialidadesController,
      PersonasController,
      MedicoController,
      PacientesController,
      {
        path: 'admin/*',
        method: RequestMethod.POST
      }
    );
  }
}
