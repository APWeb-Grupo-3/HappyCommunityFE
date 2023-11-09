import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Aviso } from '../models/aviso';
import { HttpClient } from '@angular/common/http';

const base_url= environment.base;

@Injectable({
  providedIn: 'root'
})
export class AvisoService {
  private url = `${base_url}/avisos`;
  private listaCambio = new Subject<Aviso[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Aviso[]>(this.url);
  }

  insert(av: Aviso) {
    return this.http.post(this.url, av);
  }

  setList(listaNueva: Aviso[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Aviso>(`${this.url}/${id}`);
  }

  update(av: Aviso) {
    return this.http.put(this.url, av);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
