import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reporte1DTO } from '../models/Reporte1DTO';
import { map } from 'rxjs/operators';
import { Reporte3DTO } from '../models/Reporte3DTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = `${base_url}/usuarios`;
  private listaCambio = new Subject<Usuario[]>();
  constructor(private http: HttpClient) {}

  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Usuario[]>(this.url,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
  insert(u: Usuario) {
    return this.http.post(`${this.url}/register`, u);
  }
  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }


  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Usuario>(`${this.url}/${id}`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
  update(u: Usuario) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, u,{
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
  listUser(user:string){
    let token = sessionStorage.getItem('token');

    return this.http.get<Usuario[]>(`${this.url}/listaru/${user}`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    })
  }
  
  getReport1(administrador:string):Observable<Reporte1DTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<Reporte1DTO[]>(`${this.url}/reporte1/${administrador}`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    })
  }
  getId(username:string){
    let token = sessionStorage.getItem('token');
    return this.http.get(`${this.url}/listar/${username}`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    })
  }
  listUserC(id_condominio:number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Usuario[]>(`${this.url}/listaruc/${id_condominio}`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }

  getReport3(administrador:string):Observable<Reporte3DTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<Reporte3DTO[]>(`${this.url}/reporte3/${administrador}`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    })
  }

}
