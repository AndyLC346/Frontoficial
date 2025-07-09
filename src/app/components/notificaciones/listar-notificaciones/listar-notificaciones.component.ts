import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Notificaciones } from '../../../models/notificaciones';
import { NotificacionesService } from '../../../services/notificaciones.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-notificaciones',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  templateUrl: './listar-notificaciones.component.html',
  styleUrl: './listar-notificaciones.component.css',
})
export class ListarNotificacionesComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Notificaciones> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private nS: NotificacionesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.nS.list().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.dataSource = new MatTableDataSource(data);
          this.snackBar.open(' Notificaciones cargadas correctamente.', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        } else {
          this.snackBar.open(' No se encontraron notificaciones registradas.', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      },
      error: (err) => {
        this.snackBar.open(' Error al cargar notificaciones.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });

    this.nS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.nS.delete(id).subscribe({
      next: () => {
        this.snackBar.open(' Notificación eliminada correctamente.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

        this.nS.list().subscribe((data) => {
          this.nS.setList(data);
          this.dataSource.data = data;
        });
      },
      error: () => {
        this.snackBar.open(' Error al eliminar la notificación.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }
}
