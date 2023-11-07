import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Mensaje } from '../models/mensaje';

const base_url= environment.base;

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private url = `${base_url}/mensajes`;
  private listaCambio = new Subject<Mensaje[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Mensaje[]>(this.url);
  }

  insert(me: Mensaje) {
    return this.http.post(this.url, me);
  }

  setList(listaNueva: Mensaje[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Mensaje>(`${this.url}/${id}`);
  }

  update(me: Mensaje) {
    return this.http.put(this.url, me);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }


}
