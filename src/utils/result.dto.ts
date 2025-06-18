export class ResultadoDTO {
    public codigo: number; // Estado HTTP (500,400, 401)
    public error: boolean;
    public mensaje: string;
    public datos?: any;
}