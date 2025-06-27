import { Module } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { MedicoController } from './medico.controller';
import { PersonasService } from 'src/personas/personas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entities/Index';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [MedicoController],
  providers: [MedicoService, PersonasService],
})
export class MedicoModule {}
