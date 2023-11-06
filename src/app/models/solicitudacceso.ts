import { Condominio } from "./condominio"
import { Usuario } from "./usuario"

export class SolicitudAcceso{

    idSolicitudAcceso:number =0
    estado:string=""
    usuario: Usuario =new Usuario()
    condominio:Condominio =new Condominio()
}