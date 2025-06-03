import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { TipoMetrica } from '../enums/metricas.type.enum';
import { MetodosHttp } from '../enums/metricas.metodos.http.enum';

@Entity()
export class Metrica {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    requestId: string; // UID

    @Column({
        enum: TipoMetrica
    })
    type: TipoMetrica;

    @Column()
    ruta: string;

    @Column({
        enum: MetodosHttp
    })
    metodo: MetodosHttp;

    @Column({nullable:true})
    statusCode?: number;

    @Column({nullable: true})
    duracion?: number; // finish
    
    @Column({nullable: true})
    usuarioId?: string;
    
    @Column()
    timestamp: string;
}
