import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SolicitudAcceso } from '../models/solicitudacceso';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

const base_url = environment.base;


@Injectable({
  providedIn: 'root'
})
export class SolicitudaccesoService {

  private url = `${base_url}/solicitudacceso`;
  private listaCambio = new Subject<SolicitudAcceso[]>();
  constructor(private http: HttpClient) {}

  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<SolicitudAcceso[]>(this.url,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
  insert(ru: SolicitudAcceso) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, ru,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva: SolicitudAcceso[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }


  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<SolicitudAcceso>(`${this.url}/${id}`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
  update(ru: SolicitudAcceso) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, ru,{
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
  }}
