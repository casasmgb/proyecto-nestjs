import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { Usuarios } from 'src/entities/Usuarios';
import { DataSource, Repository } from 'typeorm';
import { LoginDto } from './dto/login-autenticacion.dto';
import { Estados } from 'src/entities/Estados';
import { throwError } from 'src/utils/error.handling';

@Injectable()
export class AutenticacionService {

    constructor(
        @InjectRepository(Usuarios)
        private usuarioRepository: Repository<Usuarios>,
        private dataSource: DataSource
    ){}

    protected hashPassword(password: string): string {
        const hash = crypto.createHash('sha256').update(password).digest('hex')
        return hash
    }

    async loginWithORM (loginDto: LoginDto): Promise<Usuarios | null> {
        // Hashear el password
        const hash_password = this.hashPassword(loginDto.usu_pasword);

        const estado = new Estados()
        estado.est_id = 1 

        // Consulta de login
        const usuario = await this.usuarioRepository.findOne({
            where: {
                usu_usuario: loginDto.usu_usuario,
                usu_password: hash_password,
                est_: estado,
            },
            select: {
                usu_id: true,
                usu_usuario: true,
                per_: {
                    per_id: true,
                    per_nombre_completo: true,
                    per_documento_identidad: true
                },
                est_: {
                    est_id: true,
                    est_nombre: true
                },
            },
            relations: ['per_', 'est_']
        })

        if(!usuario) throwError(401, 'El suusario no existe')
        return usuario
    }

    async loginWithSql (loginDto: LoginDto): Promise<Usuarios | null> {
        // Hashear el password
        const hash_password = this.hashPassword(loginDto.usu_pasword);
        const query = `
            SELECT 
                u.usu_id,
                u.usu_usuario,
                u.per_id,
                u.est_id,
                e.est_nombre,
                p.per_nombre_completo,
                p.per_documento_identidad
            FROM autenticacion.usuarios AS u
            INNER JOIN parametricas.estados AS e ON e.est_id = u.est_id
            INNER JOIN reservas.personas AS p ON p.per_id = u.per_id
            WHERE TRUE
            AND u.usu_usuario = $1
            AND u.usu_password = $2
            AND u.est_id = 1
        `
        let usuario = await this.dataSource.query(query, [
            loginDto.usu_usuario,
            hash_password
        ])

        usuario = usuario[0]
        if(!usuario) throwError(401, 'El suusario no existe')
        return usuario
    }

 }
