import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CondominioComponent } from './components/condominio/condominio.component';
import { CreaeditaComponent } from './components/condominio/creaedita/creaedita.component';
import { CreaditaTDPComponent } from './components/tipo-documento-pago/creadita-tdp/creadita-tdp.component';
import { ListarTDPComponent } from './components/tipo-documento-pago/listar-tdp/listar-tdp.component';
import { TipoDocumentoPagoComponent } from './components/tipo-documento-pago/tipo-documento-pago.component';
import { TipoServicioComponent } from './components/tipo-servicio/tipo-servicio.component';
import { CreaeditaTiposervicioComponent } from './components/tipo-servicio/creaedita-tiposervicio/creaedita-tiposervicio.component';
import { ListarTiposervicioComponent } from './components/tipo-servicio/listar-tiposervicio/listar-tiposervicio.component';

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
