import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMedicoDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    public per_documento_identidad: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    public med_matricula: string;

    @IsNumber()
    @IsNotEmpty()
    public usu_id: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    public per_nombre_completo: string;
}
