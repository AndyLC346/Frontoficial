import { Component } from '@angular/core';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/producto.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comparar-producto',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './comparar-producto.component.html',
  styleUrl: './comparar-producto.component.css'
})
export class CompararProductoComponent {

  id1!: number;
  id2!: number;
  productos: Producto[] = [];
  error = '';

  productaso?: Producto;

  constructor(private pS: ProductoService) { }

  comparar() {
    this.error = '';

    if (!this.id1 || !this.id2 || this.id1 === this.id2) {
      this.error = 'Ingresa dos IDs distintos';
      this.productos = []; // Limpia las tarjetas si ya existían
      return;
    }

    this.pS.comparar(this.id1, this.id2).subscribe({
      next: data => {
        this.productos = data;
      },
      error: () => {
        this.error = 'Uno o ambos IDs no existen';
        this.productos = []; // Asegura que no se muestren tarjetas con error
      }
    });
  }

  obtenerImagenProducto(prod: Producto): string {
    const id = prod?.idProducto;
    return id ? `assets/img/${id}.jpg` : 'assets/img/default.jpg';
  }

}
