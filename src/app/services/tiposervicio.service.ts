import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TipoServicio } from '../models/tiposervicio';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<TipoServicio[]>(this.url);
  }
  insert(de: TipoServicio) {
    return this.http.post(this.url, de);
  }
  setList(listaNueva: TipoServicio[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }


  listId(id: number) {
    return this.http.get<TipoServicio>(`${this.url}/${id}`);
  }
  update(d: TipoServicio) {
    return this.http.put(this.url, d);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }}
