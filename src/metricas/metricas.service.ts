import { Injectable } from '@nestjs/common';
import { CreateMetricaDto } from './dto/create-metrica.dto';
import { UpdateMetricaDto } from './dto/update-metrica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Metrica } from './entities/metrica.entity';
import { Between, Like, Repository } from 'typeorm';
import { GetAllMetricasDTO } from './dto/getAll-metricas.dto';
import { GetOneMetricaDTO } from './dto/getOne-metricas.dto';
import {v4 as uuidv4} from 'uuid'

@Injectable()
export class MetricasService {

  constructor(
    @InjectRepository(Metrica, 'metricsConnection') 
    private metricasRepo: Repository<Metrica>
  ) {}

  async create(createMetricaDto: CreateMetricaDto) {
    const metrica = this.metricasRepo.create(
      {
        ...createMetricaDto,
        timestamp: new Date().toISOString()
      }
  )

    const resultMetrica = await this.metricasRepo.save(metrica)
    return resultMetrica
  }

  generarRequestId(): string {
    return uuidv4();
  }

  async findAll(getAllMetricasDTO: GetAllMetricasDTO):Promise<Metrica[]> {
    const where: any = {}

    // verificar si llega ruta
    if (getAllMetricasDTO.ruta) {
      where.ruta = Like(`%${getAllMetricasDTO.ruta}%`);
    }
    // verificar si llega metodo
    if (getAllMetricasDTO.metodo) {
      where.metodo = getAllMetricasDTO.metodo;
    }
  // verificar si llega usuarioId
    if (getAllMetricasDTO.usuarioId) {
      where.usuarioId = getAllMetricasDTO.usuarioId;
    }
    // verificar si llega fechaInicio y fechaFinal
    if (getAllMetricasDTO.fechaInicio && getAllMetricasDTO.fechaFinal) {
      where.timestamp = Between(
        new Date(getAllMetricasDTO.fechaInicio),
        new Date(getAllMetricasDTO.fechaFinal)
      );
    }

    const result = this.metricasRepo.find({
      where,
      order: {timestamp: 'DESC'}
    })
    return result;
  }

  async findOne(getOneMetricaDTO: GetOneMetricaDTO): Promise<any> {
    const result = this.metricasRepo.find({
      where: {
        id: getOneMetricaDTO.id
      }
    });
    return result;
  }

  async getResumenMetodos () : Promise<{metodo: string; count: number}[]> {
    const result = this.metricasRepo.createQueryBuilder('metrica')
                                    .select('metrica.metodo', 'metodo')
                                    .addSelect('COUNT(*)', 'count')
                                    .groupBy('metrica.metodo')
                                    .getRawMany()

    return result;
  }

  update(id: number, updateMetricaDto: UpdateMetricaDto) {
    return `This action updates a #${id} metrica`;
  }

  remove(id: number) {
    return `This action removes a #${id} metrica`;
  }
}
