import { Condominio } from './condominio';
import { Usuario } from './usuario';

export class Aviso {
  idAviso: number = 0;
  titulo: string = '';
  descripcion: string = '';
  usuario: Usuario = new Usuario();
  condominio:Condominio =new Condominio()
}
