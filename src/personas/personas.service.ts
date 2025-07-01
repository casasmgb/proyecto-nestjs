import { Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { DataSource } from 'typeorm';
import { throwError } from 'src/utils/error.handling';
import { verificarRespuesta } from 'src/utils/result.handling';
import { GetPersonaDto } from './dto/get-persona.dto';

@Injectable()
export class PersonasService {

  constructor (
    private readonly dataSource: DataSource
  ){}

  async create(createPersonaDto: CreatePersonaDto) {
    try {
      // TODO verificar si existe la persona 
      const sql_verificacion = `
        SELECT per_id FROM reservas.personas
        WHERE per_documento_identidad = $1;
      `
      const persona_result = await this.dataSource.query(sql_verificacion, [
        createPersonaDto.per_documento_identidad
      ])

      // TODO si existe entonces devolver un mensaje y detener el endpoint
      if (persona_result.length > 0 && persona_result[0].per_id > 0) {
        throwError(400, 'LA PERSONA YA SE ENCUENTRA REGISTRADA.')
      }

      // TODO Obtener el ultimo ID
      const sql_id = `
        SELECT COALESCE(MAX(per_id), 0) + 1 AS ultimo_id FROM reservas.personas
      `
      const result_id = (await this.dataSource.query(sql_id))[0];
      
      // TODO Crear persona si no existe
      const crear_sql = `
        INSERT INTO reservas.personas (
          per_id,
          per_nombre_completo, 
          per_documento_identidad,
          per_fecha_nacimiento,
          per_telefono,
          per_correo,
          per_direccion,
          usuario_registro
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8
        )
        RETURNING per_id
      `
      const personas = await this.dataSource.query(crear_sql, [
        result_id.ultimo_id,
        createPersonaDto.per_nombre_completo,
        createPersonaDto.per_documento_identidad,
        createPersonaDto.per_fecha_nacimiento || null,
        createPersonaDto.per_telefono || null,
        createPersonaDto.per_correo || null,
        createPersonaDto.per_direccion || null,
        createPersonaDto.usu_id,
      ])

      // TODO retornar datos.
      return verificarRespuesta(personas[0], 'Persona creada de forma correcta')
    } catch (error) {
      throwError(error.code, error.message)
    }
  }

  async findPersona(getPersonaDto: GetPersonaDto) {
    try {
      const sql = `
        SELECT 
          * 
        FROM reservas.personas
        WHERE TRUE
        ${getPersonaDto.per_id ? `AND per_id = ${getPersonaDto.per_id}` : ''}
        ${getPersonaDto.per_documento_identidad ? `AND per_documento_identidad = '${getPersonaDto.per_documento_identidad}'` : ''}  
        ${getPersonaDto.est_id ? `AND est_id = ${getPersonaDto.est_id}` : ''} 
      `
      const result_persona = await this.dataSource.query(sql)
      return verificarRespuesta(result_persona)
    } catch (error) {
      throwError(error.code, error.message)
    }
  }

  findAll() {
    return `This action returns all personas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} persona`;
  }

  update(id: number, updatePersonaDto: UpdatePersonaDto) {
    return `This action updates a #${id} persona`;
  }

  remove(id: number) {
    return `This action removes a #${id} persona`;
  }
}
