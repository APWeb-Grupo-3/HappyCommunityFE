import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Aviso } from '../models/aviso';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reporte2DTO } from '../models/Reporte2DTO';

const base_url= environment.base;

@Injectable({
  providedIn: 'root'
})
export class AvisoService {
  private url = `${base_url}/avisos`;
  private listaCambio = new Subject<Aviso[]>();
  constructor(private http: HttpClient) {}

  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Aviso[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(av: Aviso) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, av,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Aviso[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Aviso>(`${this.url}/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(av: Aviso) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, av,{
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

  getReport2(anio:number):Observable<Reporte2DTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<Reporte2DTO[]>(`${this.url}/reporte2/${anio}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  listAvisosByCondominio(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Aviso[]>(`${this.url}/listar/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  listAR(nombre_usuario: string) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Aviso[]>(`${this.url}/listarar/${nombre_usuario}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
