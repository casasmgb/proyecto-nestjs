import { Injectable, NestMiddleware } from '@nestjs/common';
import { MetricasService } from 'src/metricas/metricas.service';
import {NextFunction, Request, Response} from 'express';
import { CreateMetricaDto, MetodoHttp } from 'src/metricas/dto/create-metrica.dto';


@Injectable()
export class MetricasMiddleware implements NestMiddleware {
  constructor (
    private metricaService: MetricasService
  ){}

  async use(req: Request, res: Response, next: NextFunction) {
    // Logica de intercepcion
    const createMetricaDto = new CreateMetricaDto()
    createMetricaDto.ruta = req.originalUrl;
    createMetricaDto.metodo = req.method as MetodoHttp;
    createMetricaDto.usuarioId = '0'; // TODO VALIDAR CON TOKEN 

    await this.metricaService.create(createMetricaDto)

    next();
  }
}
