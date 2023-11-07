import { DocumentoPago } from "./documentopago"
import { Servicio } from "./servicio"

export class Detalle{
    idDetalle:number=0
    subtotalDetalle:number=0.0
    documentoPago: DocumentoPago=new DocumentoPago()
    servicio:Servicio=new Servicio()
}