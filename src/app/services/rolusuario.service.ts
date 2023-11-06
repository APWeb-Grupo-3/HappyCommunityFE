import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RolUsuario } from '../models/rolusuario';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RolusuarioService {
  private url = `${base_url}/rolusuarios`;
  private listaCambio = new Subject<RolUsuario[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<RolUsuario[]>(this.url);
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
    return this.http.get<RolUsuario>(`${this.url}/${id}`);
  }
  update(ru: RolUsuario) {
    return this.http.put(this.url, ru);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
