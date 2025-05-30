import { Injectable } from '@nestjs/common';
import { CreateMetricaDto } from './dto/create-metrica.dto';
import { UpdateMetricaDto } from './dto/update-metrica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Metrica } from './entities/metrica.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetricasService {

  constructor(
    @InjectRepository(Metrica, 'metricsConnection') 
    private metricasRepo: Repository<Metrica>
  ) {}

  async create(createMetricaDto: CreateMetricaDto) {

    const metrica = this.metricasRepo.create({
      ruta: createMetricaDto.ruta,
      metodo: createMetricaDto.metodo,
      usuarioId: createMetricaDto.usuarioId,
      timestamp: new Date().toISOString()
    })

    const resultMetrica = await this.metricasRepo.save(metrica)
    return resultMetrica
  }

  findAll() {
    return `This action returns all metricas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} metrica`;
  }

  update(id: number, updateMetricaDto: UpdateMetricaDto) {
    return `This action updates a #${id} metrica`;
  }

  remove(id: number) {
    return `This action removes a #${id} metrica`;
  }
}
