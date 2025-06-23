import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entities/Index';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [AutenticacionController],
  providers: [AutenticacionService],
})
export class AutenticacionModule {}
