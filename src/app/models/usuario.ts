import { RolUsuario } from "./rolusuario"

export class Usuario{
    idUsuario:number=0
    nombreUsuario:string=""
    clave:string=""
    habilitado:boolean=true
    rol:RolUsuario=new RolUsuario()
    nombres:string=""
    apellidos:string=""
    correo:string=""
    edad:number=0
    telefono:number=0
    genero:string=""
}