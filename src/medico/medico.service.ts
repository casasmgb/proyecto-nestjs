import { Injectable } from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { DataSource } from 'typeorm';
import { PersonasService } from 'src/personas/personas.service';
import { GetPersonaDto } from 'src/personas/dto/get-persona.dto';
import { verificarRespuesta } from 'src/utils/result.handling';
import { throwError } from 'src/utils/error.handling';
import { CreatePersonaDto } from 'src/personas/dto/create-persona.dto';

@Injectable()
export class MedicoService {
  constructor (
    private readonly dataSource: DataSource,
    private personasService: PersonasService
  ){}

  async create(createMedicoDto: CreateMedicoDto) {
    try {
      // TODO Buscar persona usando el documento de identidad
      let persona:any = null
      try {
        const getPersonaDto = new GetPersonaDto()
        getPersonaDto.per_documento_identidad = createMedicoDto.per_documento_identidad
        persona = await this.personasService.findPersona(getPersonaDto)  
      } catch (error) {
        persona = []
      }
            
      // TODO Si no existe, pedir el nombre completo.
      let persona_encontrada:any = null

      if (persona.length == 0) {
        if (!createMedicoDto.per_nombre_completo || createMedicoDto.per_nombre_completo == '') {
          throwError(400, 'SE REQUIERE DEL NOMBRE COMPLETO PARA REGISTRAR UNA PERSONA')
        }
        // TODO si existe el nombre completo entonces crear al apersona
        const createPersonaDto = new CreatePersonaDto()
        createPersonaDto.per_documento_identidad = createMedicoDto.per_documento_identidad
        createPersonaDto.per_nombre_completo = createMedicoDto.per_nombre_completo
        createPersonaDto.usu_id = createMedicoDto.usu_id
        persona_encontrada = await this.personasService.create(createPersonaDto)
      } else {
        persona_encontrada = persona[0]
      }
      // TODO Verificar si la persona ya es medico.
      const sql_es_medico = `
        SELECT per_id FROM reservas.medicos WHERE per_id = $1;
      `
      const medico_result = await this.dataSource.query(sql_es_medico, [persona_encontrada.per_id])
      if (medico_result.length > 0 && medico_result[0].per_id > 0) {
        throwError(400, 'LA PERSONA YA ES MEDICO')
      }
      // TODO Si no es medico, entonces, registrarlo.
      const ultimo_id_query = `
      SELECT COALESCE(MAX(med_id), 0) + 1 AS ultimo_id FROM reservas.medicos;
      `
      const result_ultimo_id = await this.dataSource.query(ultimo_id_query)
      const ultimo_id = result_ultimo_id[0].ultimo_id

      const insert_medico = `
      INSERT INTO reservas.medicos (
        med_id, 
        per_id, 
        med_matricula,
        usuario_registro
      ) VALUES ($1,$2,$3,$4)
      RETURNING med_id;
      `
      const result_medico = await this.dataSource.query(insert_medico, [
        ultimo_id,
        persona_encontrada.per_id,
        createMedicoDto.med_matricula,
        createMedicoDto.usu_id
      ])

      return verificarRespuesta(result_medico[0])
    } catch (error) {
      console.log(error)
      throwError(error.code, error.message)
    }
  }

  findAll() {
    return `This action returns all medico`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medico`;
  }

  update(id: number, updateMedicoDto: UpdateMedicoDto) {
    return `This action updates a #${id} medico`;
  }

  remove(id: number) {
    return `This action removes a #${id} medico`;
  }
}
