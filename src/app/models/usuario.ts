import { RolUsuario } from "./rolusuario"

export class Usuario{
    idUsuario:number=0
    nombreUsuario:string=""
    nombres:string=""
    apellidos:string=""
    correo:string=""
    clave:string=""
    edad:number=0
    telefono:number=0
    genero:string=""
    rolUsuario:RolUsuario=new RolUsuario()
}