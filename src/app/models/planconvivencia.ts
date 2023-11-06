import { Condominio } from './condominio';

export class PlanConvivencia {
  idPlanConvivencia: Number = 0;
  titulo: string = '';
  descripcion: string = '';
  condominio: Condominio = new Condominio();
}
