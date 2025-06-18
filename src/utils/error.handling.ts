export function throwError(
    code: number,
    message: string,
    codigo: number = 0
): any {
    const error: any = new Error(message || 'Error Desconocido')
    error.code = code;
    error.codigo = codigo;
    throw error;
}