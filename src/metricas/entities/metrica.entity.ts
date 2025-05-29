import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Metrica {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ruta: string;

    @Column()
    metodo: string;

    @Column()
    timestamp: string;

    @Column({nullable: true})
    usuarioId?: string;
}
