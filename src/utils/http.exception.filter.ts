import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { ResultadoDTO } from "./result.dto";
import {Response} from 'express';

@Catch(HttpExceptionFilter)
export class HttpExceptionFilter implements ExceptionFilter {
    private result: ResultadoDTO;
    catch(exception: HttpException, host: ArgumentsHost) {
        const messageException: any = exception.getResponse()
        const message = typeof messageException.message == 'string' ? messageException.message : messageException.message.join(', ')

        this.result = {
            codigo: 0,
            error: true,
            mensaje: message || messageException.errorMessage || messageException || "ERROR INESPERADO"
        }

        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        response.status(HttpStatus.BAD_REQUEST).send(this.result)
    }
}