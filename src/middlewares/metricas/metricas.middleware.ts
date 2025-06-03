import { Injectable, NestMiddleware } from '@nestjs/common';
import { MetricasService } from 'src/metricas/metricas.service';
import {NextFunction, Request, Response} from 'express';
import { MetodosHttp } from 'src/metricas/enums/metricas.metodos.http.enum';
import { CreateMetricaDto } from 'src/metricas/dto/create-metrica.dto';
import { TipoMetrica } from 'src/metricas/enums/metricas.type.enum';


@Injectable()
export class MetricasMiddleware implements NestMiddleware {
  constructor (
    private metricaService: MetricasService
  ){}

  async use(req: Request, res: Response, next: NextFunction) {
    // Registro START
    const uuid = this.metricaService.generarRequestId()
    const tiempoInicio = Date.now();

    const createMetricaDto = new CreateMetricaDto()
    createMetricaDto.requestId = uuid
    createMetricaDto.type = TipoMetrica.START
    createMetricaDto.ruta = req.originalUrl;
    createMetricaDto.metodo = req.method as MetodosHttp;
    createMetricaDto.usuarioId = '0'; // TODO VALIDAR CON TOKEN 
    await this.metricaService.create(createMetricaDto)

    // Registro FINISH
    res.on(TipoMetrica.FINISH, async() => {
      const createMetricaDto = new CreateMetricaDto()
      createMetricaDto.requestId = uuid;
      createMetricaDto.type = TipoMetrica.FINISH
      createMetricaDto.ruta = req.originalUrl
      createMetricaDto.metodo = req.method as MetodosHttp
      createMetricaDto.usuarioId = '0'; // TODO VALIDAR CON TOKEN 
      createMetricaDto.duracion = Date.now() - tiempoInicio
      await this.metricaService.create(createMetricaDto)
    })
    
    next();
  }
}
