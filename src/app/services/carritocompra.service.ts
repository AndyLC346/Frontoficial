import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarritoCompra } from '../models/carritocompra';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { OrdenCarritoCompraDTO } from '../models/OrdenCarritoCompraDTO';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class CarritocompraService {
  private url=`${base_url}/carritocompra`;
  private listaCarritoCompra=new Subject<CarritoCompra[]>()

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<CarritoCompra[]>(`${this.url}`);
  }
    insert(Cc:CarritoCompra){
      return this.http.post(this.url,Cc)
    }
  
    getList(){
      return this.listaCarritoCompra.asObservable();
    }
    setList(listaNueva:CarritoCompra[]){
      this.listaCarritoCompra.next(listaNueva)
    }
  
    listID(id:number){
      return this.http.get<CarritoCompra>(`${this.url}/${id}`);
    }
  
    update(Cc:CarritoCompra){
      return this.http.put(this.url, Cc);
    }
  
    deleteA(id:number){
      return this.http.delete(`${this.url}/${id}`);
    }
    search(idUsuario: string) {
  const params = { idUsuario }; // backend espera "idUsuario"
  return this.http.get<CarritoCompra[]>(`${this.url}/BuscarCarritoPorID`, { params });
}

OrderCarritoCompra():Observable<OrdenCarritoCompraDTO[]>{
return this.http.get<OrdenCarritoCompraDTO[]>(`${this.url}/carrito-ordenado-porPrecio`)
}

}
