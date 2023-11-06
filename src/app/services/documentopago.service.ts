import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DocumentoPago } from '../models/documentopago';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class DocumentopagoService {
  private url = `${base_url}/documentodepagos`;
  private listaCambio = new Subject<DocumentoPago[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<DocumentoPago[]>(this.url);
  }
  insert(dp: DocumentoPago) {
    return this.http.post(this.url, dp);
  }
  setList(listaNueva: DocumentoPago[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }


  listId(id: number) {
    return this.http.get<DocumentoPago>(`${this.url}/${id}`);
  }
  update(dp: DocumentoPago) {
    return this.http.put(this.url, dp);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
