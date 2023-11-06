import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlanConvivencia } from '../models/planconvivencia';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class PlanconvivenciaService {

  private url = `${base_url}/PlanConvivencia`;
  private listaCambio = new Subject<PlanConvivencia[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<PlanConvivencia[]>(this.url);
  }
  insert(ru: PlanConvivencia) {
    return this.http.post(this.url, ru);
  }
  setList(listaNueva: PlanConvivencia[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }


  listId(id: number) {
    return this.http.get<PlanConvivencia>(`${this.url}/${id}`);
  }
  update(ru: PlanConvivencia) {
    return this.http.put(this.url, ru);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
