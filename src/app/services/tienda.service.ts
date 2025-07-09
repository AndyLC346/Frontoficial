import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tienda } from '../models/tienda';
import { Subject } from 'rxjs';
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private url = `${base_url}/tiendas`;
  private listaCambio = new Subject<Tienda[]>()

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Tienda[]>(this.url);
  }

  insert(t: Tienda) {
    return this.http.post(this.url, t)
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Tienda[]) {
    this.listaCambio.next(listaNueva)
  }

  listID(id: number) {
    return this.http.get<Tienda>(`${this.url}/${id}`);
  }

  update(t: Tienda) {
    return this.http.put(this.url, t);
  }

  deleteA(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  search(nombre: string) {
    const params = { nom: nombre };
    return this.http.get<Tienda[]>(`${this.url}/busquedasnombre`, { params });
  }

}
