import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { sendErrorCustom, sendSuccessCustom } from 'src/utils/sender.hadling';

@Controller('personas')
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}

  @Post()
  async create(@Res() res, @Body() createPersonaDto: CreatePersonaDto) {
    try {
      const result = await this.personasService.create(createPersonaDto);
      return sendSuccessCustom(res, HttpStatus.CREATED, result.per_id, 'PERSONA REGISTRADA DE FORMA CORRECTA')
    } catch (error) {
      return sendErrorCustom(res, error.code, 0, error.message)
    }
  }

  @Get()
  findAll() {
    return this.personasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return this.personasService.update(+id, updatePersonaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personasService.remove(+id);
  }
}
