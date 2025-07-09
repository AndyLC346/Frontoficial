import { Component, OnInit } from '@angular/core';
import { Tienda } from '../../../models/tienda';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TiendaService } from '../../../services/tienda.service';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { VermapaComponent } from '../vermapa/vermapa.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-buscartienda',
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
  templateUrl: './buscartienda.component.html',
  styleUrl: './buscartienda.component.css'
})
export class BuscartiendaComponent implements OnInit {
  dataSource: MatTableDataSource<Tienda> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];



  form: FormGroup;
  tipoBusqueda: string = '';

  constructor(private tS: TiendaService, private fb: FormBuilder, private dialog: MatDialog) {
    this.form = fb.group({
      cajita: [''],
    });
  }
  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.form.get('cajita')?.valueChanges.subscribe((value) => {
      this.tipoBusqueda = value;
      this.buscar();
    });
  }
  buscar() {
    if (this.tipoBusqueda.trim()) {
      this.tS.search(this.tipoBusqueda).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    } else {
      this.tS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
  }


  mostrarMapa(tienda: Tienda) {
    this.dialog.open(VermapaComponent, {
      width: '400px',
      data: {
        lat: tienda.latitudTienda,
        lon: tienda.longitudTienda
      }
    })
  }
}
