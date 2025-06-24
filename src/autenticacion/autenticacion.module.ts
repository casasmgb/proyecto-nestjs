import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entities/Index';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './config/jwt.config';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register(jwtConfig)
  ],
  controllers: [AutenticacionController],
  providers: [AutenticacionService, JwtStrategy],
  exports: [JwtModule, PassportModule]
})
export class AutenticacionModule {}
