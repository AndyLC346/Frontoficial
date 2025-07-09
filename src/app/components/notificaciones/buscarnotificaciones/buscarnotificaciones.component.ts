import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Notificaciones } from '../../../models/notificaciones';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NotificacionesService } from '../../../services/notificaciones.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-buscarnotificaciones',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
    MatSelectModule
  ],
  templateUrl: './buscarnotificaciones.component.html',
  styleUrl: './buscarnotificaciones.component.css'
})
export class BuscarnotificacionesComponent implements OnInit {

  dataSource: MatTableDataSource<Notificaciones> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  form: FormGroup;

  constructor(private fb: FormBuilder, private nS: NotificacionesService) {
    this.form = fb.group({
      estadoLectura: ['']
    });
  }

  ngOnInit(): void {
    this.nS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.form.get('estadoLectura')?.valueChanges.subscribe(value => {
      this.buscar(value);
    });
  }

  buscar(estado: string) {
    if (estado !== '') {
      const boolEstado = estado === 'true'; // convierte a booleano
      this.nS.searchByLeido(boolEstado).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
    } else {
      this.nS.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
  }
}
