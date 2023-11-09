import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SolicitudAcceso } from '../models/solicitudacceso';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<SolicitudAcceso[]>(this.url);
  }
  insert(ru: SolicitudAcceso) {
    return this.http.post(this.url, ru);
  }
  setList(listaNueva: SolicitudAcceso[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }


  listId(id: number) {
    return this.http.get<SolicitudAcceso>(`${this.url}/${id}`);
  }
  update(ru: SolicitudAcceso) {
    return this.http.put(this.url, ru);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }}
