import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TiendaService } from '../../../services/tienda.service';
import { Tienda } from '../../../models/tienda';
import { MatDialog } from '@angular/material/dialog';
import { VermapaComponent } from '../vermapa/vermapa.component';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listartienda',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  templateUrl: './listartienda.component.html',
  styleUrl: './listartienda.component.css'
})
export class ListartiendaComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Tienda> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private tS: TiendaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadData(): void {
    this.tS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

      if (data.length === 0) {
        this.snackBar.open('No existen tiendas registradas', 'Cerrar', {
          duration: 4000
        });
      }
    });
  }

  mostrarMapa(tienda: Tienda) {
    this.dialog.open(VermapaComponent, {
      width: '400px',
      data: {
        lat: tienda.latitudTienda,
        lon: tienda.longitudTienda
      }
    });
  }

  eliminar(id: number): void {
    this.tS.deleteA(id).subscribe({
      next: () => {
        this.snackBar.open('Tienda eliminada correctamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.loadData();
      },
      error: () => {
        this.snackBar.open('Ocurrió un error al eliminar la tienda', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
