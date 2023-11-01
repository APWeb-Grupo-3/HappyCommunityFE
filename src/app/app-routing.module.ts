import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CondominioComponent } from './components/condominio/condominio.component';
import { CreaeditaComponent } from './components/condominio/creaedita/creaedita.component';

const routes: Routes = [
  {
    path: 'condominios',
    component: CondominioComponent,
    children: [
      { path: 'nuevo', component: CreaeditaComponent },
      { path: 'edicion/:id', component: CreaeditaComponent },

    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
