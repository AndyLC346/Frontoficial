import {Usuario } from "./usuario";

export class MetodoPago {
  idMetodoPago: number = 0;
  tipo: string = "";
  vencimientoMetodo: Date = new Date();
  user: Usuario = new Usuario();
}
