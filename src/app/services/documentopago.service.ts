import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DocumentoPago } from '../models/documentopago';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MesDeudaReDTO } from '../models/MesDeudaReDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class DocumentopagoService {
  private url = `${base_url}/documentodepagos`;
  private listaCambio = new Subject<DocumentoPago[]>();
  constructor(private http: HttpClient) {}

  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<DocumentoPago[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(dp: DocumentoPago) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, dp, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva: DocumentoPago[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<DocumentoPago>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(dp: DocumentoPago) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, dp, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  MayorDeudaMes(): Observable<MesDeudaReDTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<MesDeudaReDTO[]>(`${this.url}/MesMayorDeuda`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
