import { Injectable } from '@nestjs/common';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { UpdateEspecialidadeDto } from './dto/update-especialidade.dto';
import { Especialidades } from 'src/entities/Especialidades';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Estados } from 'src/entities/Estados';

@Injectable()
export class EspecialidadesService {
  constructor(
    @InjectRepository(Especialidades)
    private especialdiadesRepository: Repository<Especialidades>,
    private dataSource: DataSource,
  ){}

  async create(createEspecialidadeDto: CreateEspecialidadeDto): Promise<Especialidades>{
    // TODO: generar el id siguiente
    const sql_id = `
    SELECT COALESCE(MAX(esp_id), 0) + 1 AS ultimo_id
    FROM parametricas.especialidades;
    `
    const result_id = (await this.dataSource.query(sql_id))[0]
    const id_siguiente = result_id.ultimo_id;

    // TODO: sql de insersion
    const sql_insert = `
      INSERT INTO parametricas.especialidades (
        esp_id,
        esp_nombre,
        esp_observacion,
        usuario_registro
      ) VALUES ($1, $2, $3, $4)
      RETURNING (esp_id, esp_nombre, esp_observacion, fecha_registro);
    `
    const result_especilidad = await this.dataSource.query(sql_insert,[
      id_siguiente,
      createEspecialidadeDto.esp_nombre,
      createEspecialidadeDto.esp_observacion || 'SIN OBSERVACIONES',
      createEspecialidadeDto.usu_id
    ])
    // retornar datos.
    return result_especilidad[0];
  }

  async findAllTypeOrm(): Promise<Especialidades[]> {
    const estado = new Estados()
    estado.est_id = 1;

    const resultado = this.especialdiadesRepository.find({
      where: {
        est_: estado
      },
      order: {
        esp_id: 'ASC'
      },
      take: 20
    })

    return resultado
  }

  async findAllSql(): Promise<any[]> {
    const sql = `
      SELECT 
        e.*,
        es.est_nombre 
      FROM parametricas.especialidades AS e
      INNER JOIN parametricas.estados AS es on es.est_id = e.est_id
    `
    const resultado = this.dataSource.query(sql)

    return resultado;
  }

  update(id: number, updateEspecialidadeDto: UpdateEspecialidadeDto) {
    return `This action updates a #${id} especialidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} especialidade`;
  }
}
