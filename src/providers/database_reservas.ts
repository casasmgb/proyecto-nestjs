import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConficReservas implements TypeOrmOptionsFactory {

    constructor(private _configService: ConfigService) {}
    
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            synchronize: false,
            logging: true,
            autoLoadEntities: true,
            applicationName: process.env.NAME,
            retryAttempts: 10,
            extra: {
                keepAlive: true,
                connectioLimite: 10,
            }
        }
    }
}