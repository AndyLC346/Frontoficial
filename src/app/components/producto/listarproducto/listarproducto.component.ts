import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/producto.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarproducto',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatPaginatorModule
  ],
  templateUrl: './listarproducto.component.html',
  styleUrl: './listarproducto.component.css'
})
export class ListarproductoComponent implements OnInit {
  dataSource: MatTableDataSource<Producto> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8']

  producto?: Producto;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pS: ProductoService) { }

  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })

    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  modoVisualizacion: 'lista' | 'tarjeta' = 'lista';

  cambiarVista() {
    this.modoVisualizacion = this.modoVisualizacion === 'lista' ? 'tarjeta' : 'lista';
  }


  obtenerImagenProducto(producto: Producto): string {
    const id = producto?.idProducto;
    return id ? `assets/img/${id}.jpg` : 'assets/img/default.jpg';
  }

  eliminar(id: number) {
    this.pS.deleteA(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      })
    })
  }
}
