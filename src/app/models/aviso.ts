import { Condominio } from './condominio';
import { Usuario } from './usuario';

export class Aviso {
  idAviso: number = 0;
  titulo: string = '';
  descripcion: string = '';
  fechaPublicacion: Date = new Date(Date.now());
  usuario: Usuario = new Usuario();
  condominio: Condominio = new Condominio();
}
