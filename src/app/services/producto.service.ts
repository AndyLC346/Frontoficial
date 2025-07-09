import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Subject } from 'rxjs';
import { CantidadProductoDTO } from '../models/cantidadproductoDTO';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url = `${base_url}/productos`
  private listaCambio = new Subject<Producto[]>()


  constructor(private h: HttpClient) { }

  list() {
    return this.h.get<Producto[]>(`${this.url}/listadoproducto`);
  }


  insert(p: Producto) {
    return this.h.post(this.url, p)
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Producto[]) {
    this.listaCambio.next(listaNueva)
  }

  listID(id: number) {
    return this.h.get<Producto>(`${this.url}/${id}`);
  }

  update(p: Producto) {
    return this.h.put(this.url, p);
  }

  deleteA(id: number) {
    return this.h.delete(`${this.url}/${id}`);
  }

  search(nombre: string) {
    const params = { nom: nombre };
    return this.h.get<Producto[]>(`${this.url}/busquedasnombre`, { params });
  }

  obtenerCantidadProductosPorTienda() {
    return this.h.get<CantidadProductoDTO[]>(`${this.url}/cantidadesproductos`);
  }

  comparar(id1: number, id2: number) {
  return this.h.get<Producto[]>(
    `${this.url}/productoscomparar`,
    { params: { id1, id2 } }
  );
}

}
