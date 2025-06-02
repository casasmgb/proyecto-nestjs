import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";

export class GetAllMetricasDTO {
    @ApiProperty()
    @IsString()
    @IsOptional()
    public ruta?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    public metodo?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    public usuarioId?: string;

    @ApiProperty()
    @IsOptional()
    @IsDateString()
    public fechaInicio?: string;

    @ApiProperty()
    @IsOptional()
    @IsDateString()
    public fechaFinal?: string;
}