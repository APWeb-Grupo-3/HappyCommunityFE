import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RolUsuario } from '../models/rolusuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RolusuarioService {
  private url = `${base_url}/rolusuarios`;
  private listaCambio = new Subject<RolUsuario[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<RolUsuario[]>(`${this.url}/getroles`);
  }
  insert(ru: RolUsuario) {
    return this.http.post(this.url, ru);
  }
  setList(listaNueva: RolUsuario[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }


  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<RolUsuario>(`${this.url}/${id}`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
  update(ru: RolUsuario) {
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
  }
}
