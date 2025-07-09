import { MetodoPago } from "./metodo-pago"
import { Producto } from "./producto"
import { Usuario } from "./usuario"

export class CarritoCompra{
idCarritoCompra:number=0
fechaCreaCarritoCompra:Date =new Date()
producto:Producto=new Producto()
metodoPago:MetodoPago =new MetodoPago()
user:Usuario=new Usuario()
cantidad:number = 0
}
