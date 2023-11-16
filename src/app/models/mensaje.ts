import { Usuario } from './usuario';

export class Mensaje {
  idMensaje: number = 0;
  titulo: string = '';
  descripcion: string = '';
  usuario: Usuario = new Usuario();
  receptor: Usuario = new Usuario();
}
