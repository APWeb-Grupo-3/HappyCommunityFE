import { CreaeditaDetalleComponent } from './detalle/creaedita-detalle/creaedita-detalle.component';
import { DetalleComponent } from './detalle/detalle.component';
import { CreaeditaServicioComponent } from './servicio/creaedita-servicio/creaedita-servicio.component';
import { ServicioComponent } from './servicio/servicio.component';
import { CreaeditaAvisoComponent } from './aviso/creaedita-aviso/creaedita-aviso.component';
import { AvisoComponent } from './aviso/aviso.component';
import { CreaeditaMensajeComponent } from './mensaje/creaedita-mensaje/creaedita-mensaje.component';
import { MensajeComponent } from './mensaje/mensaje.component';
import { CreaeditaTarjetaComponent } from './tarjeta/creaedita-tarjeta/creaedita-tarjeta.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { CreaeditaSolicitudaccesoComponent } from './solicitud-acceso/creaedita-solicitudacceso/creaedita-solicitudacceso.component';
import { SolicitudAccesoComponent } from './solicitud-acceso/solicitud-acceso.component';
import { CreaeditaPlanconvivenciaComponent } from './plan-convivencia/creaedita-planconvivencia/creaedita-planconvivencia.component';
import { PlanConvivenciaComponent } from './plan-convivencia/plan-convivencia.component';
import { DocumentopagoComponent } from './documentopago/documentopago.component';
import { CreaeditaUsuarioComponent } from './usuario/creaedita-usuario/creaedita-usuario.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CreaeditaRolusuarioComponent } from './rolusuario/creaedita-rolusuario/creaedita-rolusuario.component';
import { RolusuarioComponent } from './rolusuario/rolusuario.component';
import { CreaeditaTiposervicioComponent } from './tipo-servicio/creaedita-tiposervicio/creaedita-tiposervicio.component';
import { TipoServicioComponent } from './tipo-servicio/tipo-servicio.component';
import { TipoDocumentoPagoComponent } from './tipo-documento-pago/tipo-documento-pago.component';
import { CreaditaTDPComponent } from './tipo-documento-pago/creadita-tdp/creadita-tdp.component';
import { CreaeditaComponent } from './condominio/creaedita/creaedita.component';
import { CondominioComponent } from './condominio/condominio.component';
import { CreaeditaDocumentopagoComponent } from './documentopago/creaedita-documentopago/creaedita-documentopago.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'condominios',
    component: CondominioComponent,
    children: [
      { path: 'nuevo', component: CreaeditaComponent },
      { path: 'edicion/:id', component: CreaeditaComponent },
    ],
    
  },
  {
    path: 'TipoDocPago',
    component: TipoDocumentoPagoComponent,
    children: [
      { path: 'nuevo', component: CreaditaTDPComponent },
      { path: 'edicion/:id', component: CreaditaTDPComponent },
    ],
    
  },
  
  {
    path: 'TipoServicio',
    component: TipoServicioComponent,
    children: [
      { path: 'nuevo', component: CreaeditaTiposervicioComponent },
      { path: 'edicion/:id', component: CreaeditaTiposervicioComponent },

    ],
    
  },
  {
    path: 'RolUsuario',
    component: RolusuarioComponent,
    children: [
      { path: 'nuevo', component: CreaeditaRolusuarioComponent },
      { path: 'edicion/:id', component: CreaeditaRolusuarioComponent },

    ],
    
  },
  {
    path: 'Usuario',
    component: UsuarioComponent,
    children: [
      { path: 'nuevo', component: CreaeditaUsuarioComponent },
      { path: 'edicion/:id', component: CreaeditaUsuarioComponent },

    ],
    
  },
  {
    path: 'DocumentoPago',
    component: DocumentopagoComponent,
    children: [
      { path: 'nuevo', component: CreaeditaDocumentopagoComponent },
      { path: 'edicion/:id', component: CreaeditaDocumentopagoComponent },

    ],
    
  },
  {
    path: 'planconvivencia',
    component: PlanConvivenciaComponent,
    children: [
      { path: 'nuevo', component: CreaeditaPlanconvivenciaComponent },
      { path: 'edicion/:id', component: CreaeditaPlanconvivenciaComponent },

    ],
    
  },
  {
    path: 'solicitudacceso',
    component: SolicitudAccesoComponent,
    children: [
      { path: 'nuevo', component: CreaeditaSolicitudaccesoComponent },
      { path: 'edicion/:id', component: CreaeditaSolicitudaccesoComponent },

    ],
    
  },
  {
    path: 'tarjeta',
    component: TarjetaComponent,
    children: [
      { path: 'nuevo', component: CreaeditaTarjetaComponent },
      { path: 'edicion/:id', component: CreaeditaTarjetaComponent },

    ],
    
  },
  {
    path: 'mensajes',
    component: MensajeComponent,
    children: [
      { path: 'nuevo', component: CreaeditaMensajeComponent },
      { path: 'edicion/:id', component: CreaeditaMensajeComponent },

    ],
    
  },
  {
    path: 'avisos',
    component: AvisoComponent,
    children: [
      { path: 'nuevo', component: CreaeditaAvisoComponent },
      { path: 'edicion/:id', component: CreaeditaAvisoComponent },

    ],
    
  },
  {
    path: 'Servicio',
    component: ServicioComponent,
    children: [
      { path: 'nuevo', component: CreaeditaServicioComponent },
      { path: 'edicion/:id', component: CreaeditaServicioComponent },

    ],
    
  },
  {
    path: 'Detalle',
    component: DetalleComponent,
    children: [
      { path: 'nuevo', component: CreaeditaDetalleComponent },
      { path: 'edicion/:id', component: CreaeditaDetalleComponent },

    ],
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
