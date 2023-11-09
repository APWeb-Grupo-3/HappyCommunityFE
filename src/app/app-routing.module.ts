import { CreaeditaDocumentopagoComponent } from './components/documentopago/creaedita-documentopago/creaedita-documentopago.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CondominioComponent } from './components/condominio/condominio.component';
import { CreaeditaComponent } from './components/condominio/creaedita/creaedita.component';
import { CreaditaTDPComponent } from './components/tipo-documento-pago/creadita-tdp/creadita-tdp.component';
import { TipoDocumentoPagoComponent } from './components/tipo-documento-pago/tipo-documento-pago.component';
import { TipoServicioComponent } from './components/tipo-servicio/tipo-servicio.component';
import { CreaeditaTiposervicioComponent } from './components/tipo-servicio/creaedita-tiposervicio/creaedita-tiposervicio.component';
import { RolusuarioComponent } from './components/rolusuario/rolusuario.component';
import { CreaeditaRolusuarioComponent } from './components/rolusuario/creaedita-rolusuario/creaedita-rolusuario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditaUsuarioComponent } from './components/usuario/creaedita-usuario/creaedita-usuario.component';
import { DocumentopagoComponent } from './components/documentopago/documentopago.component';
import { PlanConvivenciaComponent } from './components/plan-convivencia/plan-convivencia.component';
import { CreaeditaPlanconvivenciaComponent } from './components/plan-convivencia/creaedita-planconvivencia/creaedita-planconvivencia.component';
import { SolicitudAccesoComponent } from './components/solicitud-acceso/solicitud-acceso.component';
import { CreaeditaSolicitudaccesoComponent } from './components/solicitud-acceso/creaedita-solicitudacceso/creaedita-solicitudacceso.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { CreaeditaTarjetaComponent } from './components/tarjeta/creaedita-tarjeta/creaedita-tarjeta.component';
import { MensajeComponent } from './components/mensaje/mensaje.component';
import { CreaeditaMensajeComponent } from './components/mensaje/creaedita-mensaje/creaedita-mensaje.component';
import { AvisoComponent } from './components/aviso/aviso.component';
import { CreaeditaAvisoComponent } from './components/aviso/creaedita-aviso/creaedita-aviso.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { CreaeditaServicioComponent } from './components/servicio/creaedita-servicio/creaedita-servicio.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { CreaeditaDetalleComponent } from './components/detalle/creaedita-detalle/creaedita-detalle.component';

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
    path: 'aviso',
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
export class AppRoutingModule { }
