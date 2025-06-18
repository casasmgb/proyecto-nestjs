import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { throwError } from 'src/utils/error.handling';
import { verificarRespuesta } from 'src/utils/result.handling';

@Injectable()
export class UsuariosService {
  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  async findAll() {
    try {
      // Aca se verifican los datos impuestos
      const impuestos = [] // await this.servicio.verificar(params)
      if (impuestos.length == 0) throwError(400, 'NO HAY SERVICIO DE IMPUESTO')
      const result = [{ dato: 1 }]
      return verificarRespuesta(result, 'DATOS OBTENIDOS DE FORMA CORRECTA');
    } catch (error) {
      console.log(error)
      throwError(error.code, error.message)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
