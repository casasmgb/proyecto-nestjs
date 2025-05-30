import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum MetodoHttp {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
}

export class CreateMetricaDto {
    @ApiProperty({
        description: 'Es la ruta del endpoint accedido',
        example: '/api/ejemplo?clave=valor'
    })
    @IsString()
    @IsNotEmpty({message: '($property) Es requerido'})
    public ruta: string;

    @ApiProperty()
    @IsEnum(MetodoHttp)
    @IsNotEmpty({message: '($property) Es requerido'})
    public metodo: MetodoHttp;

    @ApiProperty()
    @IsOptional()
    public usuarioId: string;

    @ApiProperty()
    @IsOptional()
    public timestamp: string;
}
