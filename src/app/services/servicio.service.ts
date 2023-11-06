import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Servicio } from '../models/servicio';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private url = `${base_url}/servicios`;
  private listaCambio = new Subject<Servicio[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Servicio[]>(this.url);
  }
  insert(se: Servicio) {
    return this.http.post(this.url, se);
  }
  setList(listaNueva: Servicio[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }


  listId(id: number) {
    return this.http.get<Servicio>(`${this.url}/${id}`);
  }
  update(se: Servicio) {
    return this.http.put(this.url, se);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
