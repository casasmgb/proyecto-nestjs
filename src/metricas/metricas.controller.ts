import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MetricasService } from './metricas.service';
import { CreateMetricaDto } from './dto/create-metrica.dto';
import { UpdateMetricaDto } from './dto/update-metrica.dto';
import { Metrica } from './entities/metrica.entity';
import { GetAllMetricasDTO } from './dto/getAll-metricas.dto';
import { GetOneMetricaDTO } from './dto/getOne-metricas.dto';

@Controller('metricas')
export class MetricasController {
  constructor(private readonly metricasService: MetricasService) {}

  @Post()
  async create(@Body() createMetricaDto: CreateMetricaDto): Promise<Metrica> {
    return await this.metricasService.create(createMetricaDto);
  }

  // http:localhost/metricas?ruta=ddddd&metodo=GET&usuarioId
  @Get()
  async findAll(@Query() getAllMetricasDTO: GetAllMetricasDTO) {
    return this.metricasService.findAll(getAllMetricasDTO);
  }

  @Get(':id')
  async findOne(@Param() getOneMetricaDTO: GetOneMetricaDTO) {
    return this.metricasService.findOne(getOneMetricaDTO);
  }

  @Get('/resumen/metodo')
  async getResumenMetodos () {
    return this.metricasService.getResumenMetodos();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMetricaDto: UpdateMetricaDto) {
    return this.metricasService.update(+id, updateMetricaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.metricasService.remove(+id);
  }
}
