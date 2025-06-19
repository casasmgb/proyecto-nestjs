import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MetricasModule } from './metricas/metricas.module';
import { MetricasMiddleware } from './middlewares/metricas/metricas.middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConficReservas } from './providers/database_reservas';
import { EspecialidadesModule } from './especialidades/especialidades.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConficReservas }),
    UsuariosModule, MetricasModule, EspecialidadesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure (cunsumer: MiddlewareConsumer){
    cunsumer.apply(MetricasMiddleware).forRoutes('*')
  }
}
