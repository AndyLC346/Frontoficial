import { Component, OnInit } from '@angular/core';
import { Resena } from '../../../models/resena';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ResenaService } from '../../../services/resena.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-buscaresena',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './buscaresena.component.html',
  styleUrl: './buscaresena.component.css'
})
export class BuscaresenaComponent implements OnInit {
  dataSource: MatTableDataSource<Resena> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  form: FormGroup;
  tipoBusqueda: number = 0;

  constructor(private rS: ResenaService, private fb: FormBuilder) {
    this.form = fb.group({
      cajita: [''],
    });
  }
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.form.get('cajita')?.valueChanges.subscribe((value) => {
      this.tipoBusqueda = value;
      this.buscar();
    });
  }
  buscar() {
    if (this.tipoBusqueda.valueOf()) {
      this.rS.searchByCalificacion(this.tipoBusqueda).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    } else {
      this.rS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
  }
}
