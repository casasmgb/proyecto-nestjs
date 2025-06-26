import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePersonaDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public per_nombre_completo: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public per_documento_identidad: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    public per_fecha_nacimiento: Date;

    @ApiProperty()
    @IsString()
    @IsOptional()
    public per_telefono: string;

    @ApiProperty()
    @IsEmail()
    @IsOptional()
    public per_correo: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    public per_direccion: string;

    @IsNumber()
    @IsNotEmpty()
    public usu_id: number;
}
