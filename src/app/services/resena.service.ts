import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Resena } from '../models/resena';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ResenaService {

  private url = `${base_url}/resenas`
  private listaCambio = new Subject<Resena[]>()


  constructor(private h: HttpClient) { }

  list() {
    return this.h.get<Resena[]>(`${this.url}/listadoresena`);
  }


  insert(r: Resena) {
    return this.h.post(this.url, r)
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Resena[]) {
    this.listaCambio.next(listaNueva)
  }

  listID(id: number) {
    return this.h.get<Resena>(`${this.url}/${id}`);
  }

  update(p: Resena) {
    return this.h.put(this.url, p);
  }

  deleteA(id: number) {
    return this.h.delete(`${this.url}/${id}`);
  }

  searchByCalificacion(valor: number) {
    const params = { valor };
    return this.h.get<Resena[]>(`${this.url}/buscarporcalificacion`, { params });
  }

  listarOrdenadasPorCalificacion() {
    return this.h.get<Resena[]>(`${this.url}/ordenarcalificacion`);
  }
}
