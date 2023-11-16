import { TipoDocPago } from "./tipodocpago"
import { Usuario } from "./usuario"

export class DocumentoPago{
    idDocumentoPago:number=0
    idReceptor:Usuario=new Usuario()
    fechaEmision:Date=new Date(Date.now())
    fechaVencimiento:Date=new Date(Date.now())
    moneda: string=""
    total:number=0.0
    estado:string=""
    usuario:Usuario=new Usuario()
    tipoDocPago:TipoDocPago=new TipoDocPago()
}