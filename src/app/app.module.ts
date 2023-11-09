import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CondominioComponent } from './components/condominio/condominio.component';

import { HttpClientModule } from '@angular/common/http';
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
import { CreaeditaComponent } from './components/condominio/creaedita/creaedita.component';
import { ListarCondominioComponent } from './components/condominio/listar-condominio/listar-condominio.component';
import { TipoDocumentoPagoComponent } from './components/tipo-documento-pago/tipo-documento-pago.component';
import { CreaditaTDPComponent } from './components/tipo-documento-pago/creadita-tdp/creadita-tdp.component';
import { ListarTDPComponent } from './components/tipo-documento-pago/listar-tdp/listar-tdp.component';
import { TipoServicioComponent } from './components/tipo-servicio/tipo-servicio.component';
import { CreaeditaTiposervicioComponent } from './components/tipo-servicio/creaedita-tiposervicio/creaedita-tiposervicio.component';
import { ListarTiposervicioComponent } from './components/tipo-servicio/listar-tiposervicio/listar-tiposervicio.component';
import { MatDialogModule} from '@angular/material/dialog';
import { RolusuarioComponent } from './components/rolusuario/rolusuario.component';
import { ListarRolusuarioComponent } from './components/rolusuario/listar-rolusuario/listar-rolusuario.component';
import { CreaeditaRolusuarioComponent } from './components/rolusuario/creaedita-rolusuario/creaedita-rolusuario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ListarUsuarioComponent } from './components/usuario/listar-usuario/listar-usuario.component';
import { CreaeditaUsuarioComponent } from './components/usuario/creaedita-usuario/creaedita-usuario.component';
import { DocumentopagoComponent } from './components/documentopago/documentopago.component';
import { ListarDocumentopagoComponent } from './components/documentopago/listar-documentopago/listar-documentopago.component';
import { CreaeditaDocumentopagoComponent } from './components/documentopago/creaedita-documentopago/creaedita-documentopago.component';
import { PlanConvivenciaComponent } from './components/plan-convivencia/plan-convivencia.component';
import { ListarPlanconvivenciaComponent } from './components/plan-convivencia/listar-planconvivencia/listar-planconvivencia.component';
import { CreaeditaPlanconvivenciaComponent } from './components/plan-convivencia/creaedita-planconvivencia/creaedita-planconvivencia.component';
import { SolicitudAccesoComponent } from './components/solicitud-acceso/solicitud-acceso.component';
import { CreaeditaSolicitudaccesoComponent } from './components/solicitud-acceso/creaedita-solicitudacceso/creaedita-solicitudacceso.component';
import { ListarSolicitudaccesoComponent } from './components/solicitud-acceso/listar-solicitudacceso/listar-solicitudacceso.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { CreaeditaTarjetaComponent } from './components/tarjeta/creaedita-tarjeta/creaedita-tarjeta.component';
import { ListarTarjetaComponent } from './components/tarjeta/listar-tarjeta/listar-tarjeta.component';
import { MensajeComponent } from './components/mensaje/mensaje.component';
import { CreaeditaMensajeComponent } from './components/mensaje/creaedita-mensaje/creaedita-mensaje.component';
import { ListarMensajeComponent } from './components/mensaje/listar-mensaje/listar-mensaje.component';
import { AvisoComponent } from './components/aviso/aviso.component';
import { CreaeditaAvisoComponent } from './components/aviso/creaedita-aviso/creaedita-aviso.component';
import { ListarAvisoComponent } from './components/aviso/listar-aviso/listar-aviso.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { CreaeditaDetalleComponent } from './components/detalle/creaedita-detalle/creaedita-detalle.component';
import { ListarDetalleComponent } from './components/detalle/listar-detalle/listar-detalle.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { CreaeditaServicioComponent } from './components/servicio/creaedita-servicio/creaedita-servicio.component';
import { ListarServicioComponent } from './components/servicio/listar-servicio/listar-servicio.component';
@NgModule({
  declarations: [AppComponent, CondominioComponent, CreaeditaComponent, ListarCondominioComponent, TipoDocumentoPagoComponent, CreaditaTDPComponent, ListarTDPComponent, TipoServicioComponent, CreaeditaTiposervicioComponent, ListarTiposervicioComponent, RolusuarioComponent, ListarRolusuarioComponent, CreaeditaRolusuarioComponent, UsuarioComponent, ListarUsuarioComponent, CreaeditaUsuarioComponent, DocumentopagoComponent, ListarDocumentopagoComponent, CreaeditaDocumentopagoComponent, PlanConvivenciaComponent, ListarPlanconvivenciaComponent, CreaeditaPlanconvivenciaComponent, SolicitudAccesoComponent, CreaeditaSolicitudaccesoComponent, ListarSolicitudaccesoComponent, TarjetaComponent, CreaeditaTarjetaComponent, ListarTarjetaComponent, MensajeComponent, CreaeditaMensajeComponent, ListarMensajeComponent, AvisoComponent, CreaeditaAvisoComponent, ListarAvisoComponent, DetalleComponent, CreaeditaDetalleComponent, ListarDetalleComponent, ServicioComponent, CreaeditaServicioComponent, ListarServicioComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    HttpClientModule,
    BrowserAnimationsModule,
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
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
