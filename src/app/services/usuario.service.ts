import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Subject } from 'rxjs';
import { UsuarioEstadoDTO } from '../models/usuarioestadoDTO';
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = `${base_url}/usuarios`
  private listaCambio = new Subject<Usuario[]>()

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Usuario[]>(this.url);
  }

  insert(u: Usuario) {
    return this.http.post(this.url, u)
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva)
  }

  listID(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  update(u: Usuario) {
    return this.http.put(this.url, u);
  }

  deleteA(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  //obtenerUsuariosPorEstado() {
 //   return this.http.get<UsuarioEstadoDTO[]>(`${this.url}/usuarioestados`);
  //}

  obtenerUsuariosPorEstado() {
  return this.http.get<{ estado: string, cantidad: number }[]>(`${this.url}/usuarioestados`);
}
}
