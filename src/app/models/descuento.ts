import { Producto } from "./producto"

export class Descuentos{
    idDescuento:number=0
    porcentajeDescuento:number =0
    codigoDescuento:string =""
    fechaInicioDescuento:Date =new Date()
    fechaFinDescuento:Date =new Date()
    producto:Producto= new Producto
}