import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CarritoCompraProducto } from '../models/carritocompraproducto';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class CarritocompraproductoService {
  private url = `${base_url}/carritocompraproducto`;
  private listaCarritos = new Subject<CarritoCompraProducto[]>();
  constructor(private http: HttpClient) {}

    list() {
    return this.http.get<CarritoCompraProducto[]>(`${this.url}`);
  }

  insert(C: CarritoCompraProducto) {
    return this.http.post(`${this.url}`, C);
  }
   getList() {
    return this.listaCarritos.asObservable();
  }
  setList(listaNueva: CarritoCompraProducto[]) {
    this.listaCarritos.next(listaNueva);
  }
  listId(id: number) {
    return this.http.get<CarritoCompraProducto>(`${this.url}/${id}`);
  }
  deleteA(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
   update(d: CarritoCompraProducto) {
    return this.http.put(this.url, d);
  }
}
