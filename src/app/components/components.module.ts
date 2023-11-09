import { ListarServicioComponent } from './servicio/listar-servicio/listar-servicio.component';
import { CreaeditaServicioComponent } from './servicio/creaedita-servicio/creaedita-servicio.component';
import { ServicioComponent } from './servicio/servicio.component';
import { ListarDetalleComponent } from './detalle/listar-detalle/listar-detalle.component';
import { CreaeditaDetalleComponent } from './detalle/creaedita-detalle/creaedita-detalle.component';
import { DetalleComponent } from './detalle/detalle.component';
import { ListarAvisoComponent } from './aviso/listar-aviso/listar-aviso.component';
import { CreaeditaAvisoComponent } from './aviso/creaedita-aviso/creaedita-aviso.component';
import { AvisoComponent } from './aviso/aviso.component';
import { ListarMensajeComponent } from './mensaje/listar-mensaje/listar-mensaje.component';
import { CreaeditaMensajeComponent } from './mensaje/creaedita-mensaje/creaedita-mensaje.component';
import { MensajeComponent } from './mensaje/mensaje.component';
import { ListarTarjetaComponent } from './tarjeta/listar-tarjeta/listar-tarjeta.component';
import { CreaeditaTarjetaComponent } from './tarjeta/creaedita-tarjeta/creaedita-tarjeta.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { ListarSolicitudaccesoComponent } from './solicitud-acceso/listar-solicitudacceso/listar-solicitudacceso.component';
import { CreaeditaSolicitudaccesoComponent } from './solicitud-acceso/creaedita-solicitudacceso/creaedita-solicitudacceso.component';
import { SolicitudAccesoComponent } from './solicitud-acceso/solicitud-acceso.component';
import { CreaeditaPlanconvivenciaComponent } from './plan-convivencia/creaedita-planconvivencia/creaedita-planconvivencia.component';
import { ListarPlanconvivenciaComponent } from './plan-convivencia/listar-planconvivencia/listar-planconvivencia.component';
import { PlanConvivenciaComponent } from './plan-convivencia/plan-convivencia.component';
import { CreaeditaDocumentopagoComponent } from './documentopago/creaedita-documentopago/creaedita-documentopago.component';
import { ListarDocumentopagoComponent } from './documentopago/listar-documentopago/listar-documentopago.component';
import { DocumentopagoComponent } from './documentopago/documentopago.component';
import { CreaeditaUsuarioComponent } from './usuario/creaedita-usuario/creaedita-usuario.component';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CreaeditaRolusuarioComponent } from './rolusuario/creaedita-rolusuario/creaedita-rolusuario.component';
import { ListarRolusuarioComponent } from './rolusuario/listar-rolusuario/listar-rolusuario.component';
import { RolusuarioComponent } from './rolusuario/rolusuario.component';
import { ListarTiposervicioComponent } from './tipo-servicio/listar-tiposervicio/listar-tiposervicio.component';
import { CreaeditaTiposervicioComponent } from './tipo-servicio/creaedita-tiposervicio/creaedita-tiposervicio.component';
import { TipoServicioComponent } from './tipo-servicio/tipo-servicio.component';
import { ListarTDPComponent } from './tipo-documento-pago/listar-tdp/listar-tdp.component';
import { CreaditaTDPComponent } from './tipo-documento-pago/creadita-tdp/creadita-tdp.component';
import { TipoDocumentoPagoComponent } from './tipo-documento-pago/tipo-documento-pago.component';
import { ListarCondominioComponent } from './condominio/listar-condominio/listar-condominio.component';
import { CreaeditaComponent } from './condominio/creaedita/creaedita.component';
import { CondominioComponent } from './condominio/condominio.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [
    CondominioComponent, 
    CreaeditaComponent, 
    ListarCondominioComponent, 
    TipoDocumentoPagoComponent, 
    CreaditaTDPComponent, 
    ListarTDPComponent, 
    TipoServicioComponent, 
    CreaeditaTiposervicioComponent,
    ListarTiposervicioComponent, 
    RolusuarioComponent, 
    ListarRolusuarioComponent, 
    CreaeditaRolusuarioComponent, 
    UsuarioComponent, 
    ListarUsuarioComponent, 
    CreaeditaUsuarioComponent, 
    DocumentopagoComponent, 
    ListarDocumentopagoComponent, 
    CreaeditaDocumentopagoComponent,
    PlanConvivenciaComponent,
    ListarPlanconvivenciaComponent,
    CreaeditaPlanconvivenciaComponent,
    SolicitudAccesoComponent, 
    CreaeditaSolicitudaccesoComponent, 
    ListarSolicitudaccesoComponent, 
    TarjetaComponent, 
    CreaeditaTarjetaComponent, 
    ListarTarjetaComponent, 
    MensajeComponent, 
    CreaeditaMensajeComponent, 
    ListarMensajeComponent, 
    AvisoComponent, 
    CreaeditaAvisoComponent, 
    ListarAvisoComponent, 
    DetalleComponent, 
    CreaeditaDetalleComponent, 
    ListarDetalleComponent, 
    ServicioComponent, 
    CreaeditaServicioComponent, 
    ListarServicioComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatToolbarModule,
    MatDialogModule,
    RouterModule
  ]
})
export class ComponentsModule { }
