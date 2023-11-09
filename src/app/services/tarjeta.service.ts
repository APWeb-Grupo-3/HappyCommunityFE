import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Tarjeta } from '../models/tarjeta';

const base_url= environment.base;

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private url = `${base_url}/tarjetas`;
  private listaCambio = new Subject<Tarjeta[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Tarjeta[]>(this.url);
  }

  insert(ta: Tarjeta) {
    return this.http.post(this.url, ta);
  }

  setList(listaNueva: Tarjeta[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Tarjeta>(`${this.url}/${id}`);
  }

  update(ta: Tarjeta) {
    return this.http.put(this.url, ta);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  
}
