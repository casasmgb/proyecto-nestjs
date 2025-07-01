import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { GetPersonaDto } from 'src/personas/dto/get-persona.dto';
import { PersonasService } from 'src/personas/personas.service';
import { verificarRespuesta } from 'src/utils/result.handling';
import { Pacientes } from 'src/entities/Pacientes';
import { GetPacienteDTO } from './dto/get-pacientes.dto';
import { DataSource } from 'typeorm';
import { throwError } from 'src/utils/error.handling';

@Injectable()
export class PacientesService {
  constructor (
    private personasService: PersonasService,
    private dataSource: DataSource
  ){}
  async create(createPacienteDto: CreatePacienteDto) {
    try {
      // TODO buscar si la persona existe.
      const getPersonaDto = new GetPersonaDto()
      getPersonaDto.per_id = createPacienteDto.per_id;
      getPersonaDto.est_id = 1; // registro activo
      const persona = (await this.personasService.findPersona(getPersonaDto))[0]
      // console.log(persona)

      // TODO verificar si la persona ya se registro como paciente.
      let paciente = []
      try {
        const getPacienteDTO = new GetPacienteDTO()
        getPacienteDTO.per_id = createPacienteDto.per_id;
        getPacienteDTO.est_id = 1;
        paciente = await this.findAll(getPacienteDTO)
      } catch (error) {}

      console.log(paciente.length)

      if (paciente.length > 0) {
        throwError(400, 'LA PERSONA YA ESTA REGISTRADA COMO PACIENTE')
      }

      // TODO Crear el HISTORIAL MEDICO (con datos vacios)

      // TODO Obtener el ultimo paciente_id 
      const sql_ultimo_id = `SELECT COALESCE(MAX(pac_id), 0) + 1 AS ultimo_id FROM reservas.pacientes`
      const result_ultimo_id = (await this.dataSource.query(sql_ultimo_id))[0]
      const ultimo_id = result_ultimo_id.ultimo_id
      
      // TODO Guardar al paciente.
      const sql_insert = `
      INSERT INTO  reservas.pacientes (
        pac_id,
        per_id,
        hismed_id,
        usuario_registro
      ) VALUES ($1, $2, $3, $4)
      RETURNING pac_id
      `
      const result_paciente = await this.dataSource.query(sql_insert, [
        ultimo_id,
        createPacienteDto.per_id,
        null,
        createPacienteDto.usu_id
      ])

      return verificarRespuesta(result_paciente[0])
    } catch (error) {
      console.log(error)
      throwError(error.code, error.message)
    }
  }

  async findAll(getPacienteDTO: GetPacienteDTO) {
    try {
      const sql = `
        SELECT 
          p1.pac_id,
          p1.hismed_id,
          p1.est_id AS per_estado,
          p.per_documento_identidad,
          p.per_nombre_completo,
          p.est_id AS pac_estado
        FROM reservas.pacientes AS p1
        INNER JOIN reservas.personas AS p ON p.per_id = p1.per_id
        WHERE TRUE
        ${getPacienteDTO.pac_id ? `AND p1.pac_id = ${getPacienteDTO.pac_id}` : '' } 
        ${getPacienteDTO.per_id ? `AND p.per_id = ${getPacienteDTO.per_id}` : '' } 
        ${getPacienteDTO.per_documento_identidad ? `AND p.per_documento_identidad = ${getPacienteDTO.per_documento_identidad}` : ''} 
        ${getPacienteDTO.est_id ? `AND p1.est_id = ${getPacienteDTO.est_id}` : '' } 
      `
      const result = await this.dataSource.query(sql)
      return verificarRespuesta(result)
    } catch (error) {
      throwError(400, error.message)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} paciente`;
  }

  update(id: number, updatePacienteDto: UpdatePacienteDto) {
    return `This action updates a #${id} paciente`;
  }

  remove(id: number) {
    return `This action removes a #${id} paciente`;
  }
}
