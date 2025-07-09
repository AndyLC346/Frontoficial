import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Chats } from '../models/chat';
import { CantidadChatsDTO } from '../models/cantidadChatsDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url = `${base_url}/chats`;
  private listaChats = new Subject<Chats[]>();
  constructor(private http: HttpClient) { }


  list() {
    return this.http.get<Chats[]>(`${this.url}`);
  }

  insert(C: Chats) {
    return this.http.post(`${this.url}`, C);
  }
  getList() {
    return this.listaChats.asObservable();
  }
  setList(listaNueva: Chats[]) {
    this.listaChats.next(listaNueva);
  }
  listId(id: number) {
    return this.http.get<Chats>(`${this.url}/${id}`);
  }
  deleteA(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  update(c: Chats) {
    return this.http.put(this.url, c);
  }

    obtenerCantidadProductosPorTienda() {
    return this.http.get<CantidadChatsDTO[]>(`${this.url}/cantidadchats`);
  }
  
}
