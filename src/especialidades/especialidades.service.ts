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

  create(createEspecialidadeDto: CreateEspecialidadeDto) {
    return 'This action adds a new especialidade';
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
