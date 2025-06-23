import { Body, Controller, Post } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { LoginDto } from './dto/login-autenticacion.dto';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @Post('login-tyorm')
  loginWithORM(@Body() body: LoginDto){
    return this.autenticacionService.loginWithORM(body)
  }

  @Post('login-sql')
  loginWithSql(@Body() body: LoginDto){
    return this.autenticacionService.loginWithSql(body)
  }
}
