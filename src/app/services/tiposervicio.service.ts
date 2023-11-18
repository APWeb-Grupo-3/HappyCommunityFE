import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TipoServicio } from '../models/tiposervicio';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Subject } from 'rxjs';


const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class TiposervicioService {



  private url = `${base_url}/tiposervicio`;
  private listaCambio = new Subject<TipoServicio[]>();
  constructor(private http: HttpClient) {}

  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<TipoServicio[]>(this.url,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
  insert(de: TipoServicio) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, de,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva: TipoServicio[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }


  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<TipoServicio>(`${this.url}/${id}`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
  update(d: TipoServicio) {
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
  listTSA(administrador:string) {
    let token = sessionStorage.getItem('token');

    return this.http.get<TipoServicio[]>(`${this.url}/listartsa/${administrador}`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
}
