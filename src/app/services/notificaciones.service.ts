import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Notificaciones } from '../models/notificaciones';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  private url = `${base_url}/notificaciones`;
  private listaCambio = new Subject<Notificaciones[]>();

  constructor(private h: HttpClient) {}

  list() {
    return this.h.get<Notificaciones[]>(this.url);
  }

  insert(notificacion: Notificaciones) {
    return this.h.post(this.url, notificacion);
  }

  update(notificacion: Notificaciones) {
    return this.h.put(this.url, notificacion);
  }

  delete(id: number) {
    return this.h.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.h.get<Notificaciones>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Notificaciones[]) {
    this.listaCambio.next(listaNueva);
  }

  searchByLeido(estado: boolean) {
  return this.h.get<Notificaciones[]>(`${this.url}/buscarporleido`, {
    params: { estado }
  });
}
}
