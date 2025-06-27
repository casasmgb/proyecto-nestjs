import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetPersonaDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    public per_documento_identidad: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    public est_id: number;
}