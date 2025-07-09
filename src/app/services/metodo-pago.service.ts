import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MetodoPago } from '../models/metodo-pago';
import { Subject } from 'rxjs';
import { CantidadMetodoPagoDTO } from '../models/cantidadmetodopagoDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class MetodoPagoService {
  private url = `${base_url}/metodosdepago`;
  private listaCambio = new Subject<MetodoPago[]>();

  constructor(private h: HttpClient) { }

  list() {
    return this.h.get<MetodoPago[]>(this.url);
  }

  insert(metodoPago: MetodoPago) {
    return this.h.post(this.url, metodoPago);
  }

  update(metodoPago: MetodoPago) {
    return this.h.put(this.url, metodoPago);
  }

  delete(id: number) {
    return this.h.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.h.get<MetodoPago>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: MetodoPago[]) {
    this.listaCambio.next(listaNueva);
  }

  searchByTipo(valor: string) {
    return this.h.get<MetodoPago[]>(`${this.url}/buscarportipo`, {
      params: { valor }
    });
  }

  obtenerCantidadPorTipo() {
    return this.h.get<CantidadMetodoPagoDTO[]>(`${this.url}/cantidadportipo`);
  }
}
