import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({
        description: 'Es el usaurio para el LOGIN',
        example: 'admin'
    })
    @IsString()
    @IsNotEmpty({ message: '${property} es requerido' })
    public usu_usuario: string; 

    @ApiProperty({
        description: 'Es la contraseña del usuario',
        example: 'Pass33rg*123'
    })
    @IsString()
    @IsNotEmpty({ message: '${property} es requerido' })
    public usu_pasword: string;
}