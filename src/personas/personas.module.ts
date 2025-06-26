import { Module } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonasController } from './personas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entities/Index';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [PersonasController],
  providers: [PersonasService],
})
export class PersonasModule {}
