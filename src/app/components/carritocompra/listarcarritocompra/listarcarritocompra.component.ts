import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CarritoCompra } from '../../../models/carritocompra';
import { CarritocompraService } from '../../../services/carritocompra.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarcarritocompra',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatPaginatorModule,
    RouterLink,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSnackBarModule
  ],
  templateUrl: './listarcarritocompra.component.html',
  styleUrl: './listarcarritocompra.component.css',
})
export class ListarcarritocompraComponent implements OnInit {

  dataSource: MatTableDataSource<CarritoCompra> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filtro: string = '';

  constructor(private Cs: CarritocompraService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.Cs.list().subscribe((data) => {
      if (data.length === 0) {
        this.snackBar.open('No existen carritos de compra registrados', 'Cerrar', {
          duration: 4000
        });
      }
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.filterPredicate = (post: CarritoCompra, filter: string) => {
        return post.idCarritoCompra.toString().includes(filter.trim().toLowerCase());
      };
      this.dataSource.paginator = this.paginator;
      this.Cs.setList(data);
    });

    this.Cs.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  eliminar(id: number) {
    this.Cs.deleteA(id).subscribe(() => {
      this.Cs.list().subscribe((data) => {
        if (data.length === 0) {
          this.snackBar.open('No existen carritos de compra registrados', 'Cerrar', {
            duration: 4000
          });
        } else {
          this.snackBar.open('Carrito de compra eliminado correctamente.', 'Cerrar', {
            duration: 3000
          });
        }

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.Cs.setList(data);
      });
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  aplicarfiltro() {
    this.dataSource.filter = this.filtro.trim().toLowerCase();
  }
}
