import { Usuario } from "./usuario";

export class Tarjeta {
  idTarjeta: number = 0;
  tipoTarjeta: string = '';
  numeroTarjeta: number = 0;
  fechaVencimiento:Date=new Date(Date.now())
  codigoSeguridad: number = 0;
  usuario: Usuario= new Usuario()
}
