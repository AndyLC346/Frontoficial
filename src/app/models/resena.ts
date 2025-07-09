import { Producto } from "../models/producto"
import { Usuario } from "../models/usuario"

export class Resena{
  idResena: number=0
  calificacion:number=0
  comentario:string=""
  fecha:Date=new Date()
  user:Usuario=new Usuario()
  producto: Producto=new Producto()
}
