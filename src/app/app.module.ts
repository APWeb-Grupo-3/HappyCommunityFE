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


@NgModule({
  declarations: [AppComponent, CondominioComponent, CreaeditaComponent, ListarCondominioComponent, TipoDocumentoPagoComponent, CreaditaTDPComponent, ListarTDPComponent, TipoServicioComponent, CreaeditaTiposervicioComponent, ListarTiposervicioComponent],
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
