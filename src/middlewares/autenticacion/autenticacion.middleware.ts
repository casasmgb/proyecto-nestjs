import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AutenticacionMiddleware implements NestMiddleware {

  constructor (
    private jwtService: JwtService
  ) { }

  async use(req: any, res: any, next: () => void) {
    const headers = req.headers.authorization;

    if (!headers) {
      res.status(401).json({mensaje: "No se porporciono un token de autenticacion"})
    }

    const [tipo, token] = headers.split(' ')

    if (tipo !== 'Bearer' || !token) {
      res.status(401).json({mensaje: "El tipo de token no es valido"})
    }

    // Mas validaciones

    try {
      const decodificado = this.jwtService.verify(token)
      switch (req.method) {
        case 'POST':
        case 'PUT':
        case 'PATCH':
        case 'DELETE':
          req.body.usu_id = decodificado.usu_id
          break;    
        case 'GET':
          req.query.usu_id = JSON.stringify(decodificado.usu_id)
          break;
        default:
          req['usu_id'] = decodificado.usu_id
      }
      next();
    } catch (error) {
      return res.status(401).json({
        mensaje: 'Token invalido o expirado',
        error: error.message
      })
    }
  }
}
