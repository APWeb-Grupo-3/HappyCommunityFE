import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Condominio} from './../models/condominio'
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})

export class CondominioService {
  private url = `${base_url}/condominios`;
  private listaCambio = new Subject<Condominio[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Condominio[]>(this.url);
  }
  insert(de: Condominio) {
    return this.http.post(this.url, de);
  }
  setList(listaNueva: Condominio[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }


  listId(id: number) {
    return this.http.get<Condominio>(`${this.url}/${id}`);
  }
  update(d: Condominio) {
    return this.http.put(this.url, d);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

    
}
