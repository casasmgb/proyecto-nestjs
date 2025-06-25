import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEspecialidadeDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public esp_nombre: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    public esp_descripcion: string;

    @IsNumber()
    @IsNotEmpty()
    public usu_id: number;
}
