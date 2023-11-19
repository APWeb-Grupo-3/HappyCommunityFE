import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let token = sessionStorage.getItem('token');

    return this.http.get<Tarjeta[]>(this.url,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }

  insert(ta: Tarjeta) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, ta,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Tarjeta[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Tarjeta>(`${this.url}/${id}`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }

  update(ta: Tarjeta) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, ta,{
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

  listTR(nombre_usuario:string) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Tarjeta[]>(`${this.url}/listartr/${nombre_usuario}`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
  
}
