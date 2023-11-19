import { Injectable } from '@angular/core';
import { TipoDocPago } from '../models/tipodocpago';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let token = sessionStorage.getItem('token');

    return this.http.get<TipoDocPago[]>(this.url,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
  insert(de: TipoDocPago) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, de,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva: TipoDocPago[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }


  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<TipoDocPago>(`${this.url}/${id}`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
  update(d: TipoDocPago) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, d,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
  listTDR(administrador:String) {
    let token = sessionStorage.getItem('token');

    return this.http.get<TipoDocPago[]>(`${this.url}/listartdr/${administrador}`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
}
