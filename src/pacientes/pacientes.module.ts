import { Module } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { PacientesController } from './pacientes.controller';
import { PersonasService } from 'src/personas/personas.service';

@Module({
  controllers: [PacientesController],
  providers: [PacientesService, PersonasService], 
})
export class PacientesModule {}
