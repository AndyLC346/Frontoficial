import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-producto',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements OnInit {

  producto?: Producto;

  constructor(
    private route: ActivatedRoute,
    private pS: ProductoService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pS.listID(id).subscribe(data => {
      this.producto = data;
    });
  }

  obtenerImagenProducto(): string {
    const id = this.producto?.idProducto;
    return id ? `assets/img/${id}.jpg` : 'assets/img/default.jpg';
  }

  
}
