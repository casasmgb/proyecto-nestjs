import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePacienteDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    public per_id: number;

    @IsNumber()
    @IsNotEmpty()
    public usu_id: number;
}
