import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetPersonaDto {
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    @Type(()=>Number)
    public per_id: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    public per_documento_identidad: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    public est_id: number;
}