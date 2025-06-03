import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TipoMetrica } from "../enums/metricas.type.enum";
import { MetodosHttp } from "../enums/metricas.metodos.http.enum";

export class CreateMetricaDto {
    @ApiProperty({
        description: 'Identificador unico de solicitud',
        example: '00000000-rr55-ee33-333r-f4w3fws4444ff'
    })
    @IsString()
    @IsNotEmpty({message: '($property) Es requerido'})
    public requestId: string;

    @ApiProperty({
        description: 'Tipo de metrica (strat/finish)',
        enum: TipoMetrica
    })
    @IsEnum(TipoMetrica)
    @IsNotEmpty({message: '($property) Es requerido'})
    public type: TipoMetrica;

    @ApiProperty({
        description: 'Es la ruta del endpoint accedido',
        example: '/api/ejemplo?clave=valor'
    })
    @IsString()
    @IsNotEmpty({message: '($property) Es requerido'})
    public ruta: string;

    @ApiProperty()
    @IsEnum(MetodosHttp)
    @IsNotEmpty({message: '($property) Es requerido'})
    public metodo: MetodosHttp;

    @ApiProperty()
    @IsOptional()
    public statusCode: number;

    @ApiProperty()
    @IsOptional()
    public duracion: number;

    @ApiProperty()
    @IsOptional()
    public usuarioId: string;
}
