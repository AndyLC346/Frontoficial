import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/producto.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-buscarproducto',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    RouterLink],
  templateUrl: './buscarproducto.component.html',
  styleUrl: './buscarproducto.component.css'
})
export class BuscarproductoComponent implements OnInit {
  dataSource: MatTableDataSource<Producto> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  producto?: Producto;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form: FormGroup;
  tipoBusqueda: string = '';

  constructor(private pS: ProductoService, private fb: FormBuilder) {
    this.form = fb.group({
      cajita: [''],
    });
  }
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.form.get('cajita')?.valueChanges.subscribe((value) => {
      this.tipoBusqueda = value;
      this.buscar();
    });
  }
  buscar() {
    if (this.tipoBusqueda.trim()) {
      this.pS.search(this.tipoBusqueda).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    } else {
      this.pS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
  }

  modoVisualizacion: 'lista' | 'tarjeta' = 'lista';

  cambiarVista() {
    this.modoVisualizacion = this.modoVisualizacion === 'lista' ? 'tarjeta' : 'lista';
  }

  obtenerImagenProducto(producto: Producto): string {
    const id = producto?.idProducto;
    return id ? `assets/img/${id}.jpg` : 'assets/img/default.jpg';
  }



}
