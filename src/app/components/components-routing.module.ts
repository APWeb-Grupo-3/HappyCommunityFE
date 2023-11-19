import { GuardService } from './../services/guard.service';
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
import { RegisterComponent } from './register/register.component';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';
import { CondominoDetallesComponent } from './condominio/condomino-detalles/condomino-detalles.component';
import { ReportesComponent } from './reportes/reportes.component';
import { ReportemayorComponent } from './reportes/reportemayor/reportemayor.component';
import { PerfilComponent } from './usuario/perfil/perfil.component';
import { Reporte1Component } from './reportes/reporte1/reporte1.component';
import { ReportemesdeudaComponent } from './reportes/reportemesdeuda/reportemesdeuda.component';
import { MensajeRecibidoComponent } from './mensaje/mensaje-recibido/mensaje-recibido.component';
import { Reporte2bComponent } from './reportes/reporte2b/reporte2b.component';
import { Reporte5Component } from './reportes/reporte5/reporte5.component';

const routes: Routes = [
  {
    path: 'condominios',
    component: CondominioComponent,
    children: [
      { path: 'nuevo', component: CreaeditaComponent },
      { path: 'edicion/:id', component: CreaeditaComponent },
      {path: 'detalles/:id', component: CondominoDetallesComponent}
    ],

  },
  {
    path: 'TipoDocPago',
    canActivate: [GuardService],
    component: TipoDocumentoPagoComponent,
    children: [
      { path: 'nuevo', component: CreaditaTDPComponent },
      { path: 'edicion/:id', component: CreaditaTDPComponent },
    ],

  },

  {
    path: 'TipoServicio',
    canActivate: [GuardService],

    component: TipoServicioComponent,
    children: [
      { path: 'nuevo', component: CreaeditaTiposervicioComponent },
      { path: 'edicion/:id', component: CreaeditaTiposervicioComponent },

    ],

  },
  {
    path: 'RolUsuario',
    canActivate: [GuardService],

    component: RolusuarioComponent,
    children: [
      { path: 'nuevo', component: CreaeditaRolusuarioComponent },
      { path: 'edicion/:id', component: CreaeditaRolusuarioComponent },

    ],

  },
  {
    path: 'Usuario',
    canActivate: [GuardService],
    component: UsuarioComponent,
    children: [
      { path: 'nuevo', component: CreaeditaUsuarioComponent },
      { path: 'edicion/:id', component: CreaeditaUsuarioComponent},
      { path: 'perfil', component: PerfilComponent},
    ],

  },
  {
    path: 'DocumentoPago',
    canActivate: [GuardService],

    component: DocumentopagoComponent,
    children: [
      { path: 'nuevo', component: CreaeditaDocumentopagoComponent },
      { path: 'edicion/:id', component: CreaeditaDocumentopagoComponent },

    ],

  },
  {
    path: 'planconvivencia',
    canActivate: [GuardService],

    component: PlanConvivenciaComponent,
    children: [
      { path: 'nuevo', component: CreaeditaPlanconvivenciaComponent },
      { path: 'edicion/:id', component: CreaeditaPlanconvivenciaComponent },

    ],

  },
  {
    path: 'solicitudacceso',
    canActivate: [GuardService],

    component: SolicitudAccesoComponent,
    children: [
      { path: 'nuevo', component: CreaeditaSolicitudaccesoComponent },
      { path: 'edicion/:id', component: CreaeditaSolicitudaccesoComponent },

    ],

  },
  {
    path: 'tarjeta',
    canActivate: [GuardService],

    component: TarjetaComponent,
    children: [
      { path: 'nuevo', component: CreaeditaTarjetaComponent },
      { path: 'edicion/:id', component: CreaeditaTarjetaComponent },

    ],

  },
  {
    path: 'mensajes',
    canActivate: [GuardService],
    component: MensajeComponent,
    children: [
      { path: 'nuevo', component: CreaeditaMensajeComponent },
      { path: 'edicion/:id', component: CreaeditaMensajeComponent },
      { path: 'recibidos', component: MensajeRecibidoComponent},

    ],

  },
  {
    path: 'aviso',
    canActivate: [GuardService],

    component: AvisoComponent,
    children: [
      { path: 'nuevo', component: CreaeditaAvisoComponent },
      { path: 'edicion/:id', component: CreaeditaAvisoComponent },

    ],

  },
  {
    path: 'Servicio',
    canActivate: [GuardService],

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
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'Reportes',
    component: ReportesComponent,
    children: [
      { path: 'reporte1', component: Reporte1Component },
      { path: 'reporte2', component: Reporte2bComponent },
      { path: 'mayordeudames', component: ReportemayorComponent },
      { path: 'deudames', component: ReportemesdeudaComponent },
      { path: 'reporte5', component: Reporte5Component },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
