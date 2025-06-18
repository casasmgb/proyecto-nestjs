import { HttpStatus } from '@nestjs/common'
import { throwError } from './error.handling'

export async function verificarRespuesta(resultData: any, extra_message: string = '') {
    try {
        if (resultData || resultData == null || resultData.length == 0) {
            if (extra_message) throwError(HttpStatus.BAD_REQUEST, `NO SE ENCONTRATON DATOS EN ${extra_message}`)
            else throwError(HttpStatus.BAD_REQUEST, `NO SE ENCONTRATON DATOS`)
        }
        return resultData
    } catch (error) {
        throwError(HttpStatus.BAD_REQUEST, error.message || 'OCURRIO UN ERROR INESPERADO')
    }
}