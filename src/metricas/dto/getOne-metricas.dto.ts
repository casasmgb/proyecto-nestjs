import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class GetOneMetricaDTO {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({ message: '($property) Es requerido' })
    @Type(()=>Number)
    public id: number;
}