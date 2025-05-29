export class CreateMetricaDto {
    public ruta: string;
    public metodo: string;
    public usuarioId: string;
    public timestamp: Date = new Date();
}
