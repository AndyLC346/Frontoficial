import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Resena } from '../../../models/resena';
import { ResenaService } from '../../../services/resena.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listaresena',
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
  templateUrl: './listaresena.component.html',
  styleUrl: './listaresena.component.css'
})
export class ListaresenaComponent implements OnInit {
  dataSource: MatTableDataSource<Resena> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rS: ResenaService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      if (data.length === 0) {
        this.snackBar.open('No se encontraron reseñas registradas.', 'Cerrar', {
          duration: 3000,
        });
      }
      this.dataSource = new MatTableDataSource(data);
    });

    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.rS.deleteA(id).subscribe(() => {
      this.rS.list().subscribe((data) => {
        if (data.length === 0) {
          this.snackBar.open('Ya no hay reseñas disponibles.', 'Cerrar', {
            duration: 3000,
          });
        }
        this.rS.setList(data);
        this.dataSource = new MatTableDataSource(data);
      });
    });
  }
}
