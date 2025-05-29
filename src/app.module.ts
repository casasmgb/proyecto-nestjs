import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MetricasModule } from './metricas/metricas.module';

@Module({
  imports: [UsuariosModule, MetricasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
