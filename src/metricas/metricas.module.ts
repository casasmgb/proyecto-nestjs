import { Module } from '@nestjs/common';
import { MetricasService } from './metricas.service';
import { MetricasController } from './metricas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metrica } from './entities/metrica.entity';

@Module({
  imports : [
    TypeOrmModule.forRoot({
      name: 'metricsConnection',
      type: 'sqlite',
      database: 'db/metrics.db',
      entities: [Metrica],
      synchronize: true, // SOLAMENTE ES PARA DESARROLO
      logging: true,
    }),
    TypeOrmModule.forFeature([Metrica], 'metricsConnection')
  ],
  controllers: [MetricasController],
  providers: [MetricasService],
  exports: [MetricasService],
})
export class MetricasModule {}
