import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { sendErrorCustom, sendSuccessCustom } from 'src/utils/sender.hadling';

@Controller('medico')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}

  @Post()
  async create(@Res() res, @Body() createMedicoDto: CreateMedicoDto) {
    try {
      const result = await this.medicoService.create(createMedicoDto);
      return sendSuccessCustom(res, HttpStatus.CREATED, result.med_id, 'SE REGISTRO AL MEDICO')
    } catch (error) {
      return sendErrorCustom(res, error.code, 0, error.message)
    }
  }

  @Get()
  findAll() {
    return this.medicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicoDto: UpdateMedicoDto) {
    return this.medicoService.update(+id, updateMedicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicoService.remove(+id);
  }
}
