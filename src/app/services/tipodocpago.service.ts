import { Injectable } from '@angular/core';
import { TipoDocPago } from '../models/tipodocpago';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {  Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class TipodocpagoService {

  private url = `${base_url}/tipodocumentopago`;
  private listaCambio = new Subject<TipoDocPago[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<TipoDocPago[]>(this.url);
  }
  insert(de: TipoDocPago) {
    return this.http.post(this.url, de);
  }
  setList(listaNueva: TipoDocPago[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }


  listId(id: number) {
    return this.http.get<TipoDocPago>(`${this.url}/${id}`);
  }
  update(d: TipoDocPago) {
    return this.http.put(this.url, d);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
