import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DescuentoService } from '../../../services/descuento.service';
import { Descuentos } from '../../../models/descuento';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listardescuentos',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  templateUrl: './listardescuentos.component.html',
  styleUrls: ['./listardescuentos.component.css']
})
export class ListardescuentosComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Descuentos> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  noData: boolean = false;

  constructor(private dS: DescuentoService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
loadData(): void {
  this.dS.list().subscribe(data => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.noData = data.length === 0;

    if (this.noData) {
      this.snackBar.open('No existen descuentos registrados', 'Cerrar', {
        duration: 4000
      });
    }
  });
}
  eliminar(id: number): void {
    this.dS.deleteA(id).subscribe(() => {
      this.snackBar.open('Descuento eliminado correctamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-success']
      });
      this.loadData();
    }, error => {
      this.snackBar.open('Error al eliminar el descuento', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    });
  }
}
