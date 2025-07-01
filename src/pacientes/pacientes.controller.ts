import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { sendErrorCustom, sendSuccessCustom } from 'src/utils/sender.hadling';
import { GetPacienteDTO } from './dto/get-pacientes.dto';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Post()
  async create(@Res() res, @Body() createPacienteDto: CreatePacienteDto) {
    try {
     const result = await this.pacientesService.create(createPacienteDto); 
     return sendSuccessCustom(res, HttpStatus.CREATED, result.pac_id, 'PACIENTE CREADO DE FORMA CORRECTA')
    } catch (error) {
      return sendErrorCustom(res, HttpStatus.BAD_REQUEST, 0, error.message)
    }
  }

  @Get()
  async findAll(@Res() res, @Query() getPacienteDTO: GetPacienteDTO) {
    try {
      const result = await this.pacientesService.findAll(getPacienteDTO);
      return sendSuccessCustom(res, HttpStatus.OK, 0, 'DATOS DE PACIENTE OBTENIDOS DE FORMA CORRECTA', result)
    } catch (error) {
      return sendErrorCustom(res, HttpStatus.BAD_REQUEST, 0, error.message)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pacientesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePacienteDto: UpdatePacienteDto) {
    return this.pacientesService.update(+id, updatePacienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pacientesService.remove(+id);
  }
}
