import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Detalle } from '../models/detalle';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  private url = `${base_url}/detalles`;
  private listaCambio = new Subject<Detalle[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Detalle[]>(this.url);
  }
  insert(de: Detalle) {
    return this.http.post(this.url, de);
  }
  setList(listaNueva: Detalle[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Detalle>(`${this.url}/${id}`);
  }
  update(de: Detalle) {
    return this.http.put(this.url, de);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
