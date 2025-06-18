import { ResultadoDTO } from './result.dto'

export async function sendSuccessCustom(
    res: any,
    estado: number,
    codigo: number,
    mensaje: string,
    datos?: any
): Promise<any> {
    if (datos && typeof datos == 'object') {
        datos.mensaje = mensaje
    } else {
        datos = {
            mensaje: mensaje,
            codigo: codigo
        }
    }

    const resultado: ResultadoDTO = {
        codigo: codigo,
        error: false,
        mensaje: mensaje || 'DATOS PROCESADOS CON EXITO',
        datos: datos || []
    }
    res.status(estado).send(resultado)
}

export async function sendErrorCustom(
    res: any,
    estado: number,
    codigo: number,
    mensaje: string
): Promise<any> {
    const resultado: ResultadoDTO = {
        codigo: codigo,
        error: true,
        mensaje: mensaje || 'ERROR DURANTE EL PRECESO DEL SERVICIO',
        datos: []
    }
    res.status(estado).send(resultado)
}