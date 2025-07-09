import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MetodoPago } from '../../../models/metodo-pago';
import { MetodoPagoService } from '../../../services/metodo-pago.service';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscarmetodopago',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    RouterLink
  ],
  templateUrl: './buscarmetodopago.component.html',
  styleUrl: './buscarmetodopago.component.css'
})
export class BuscarmetodopagoComponent implements OnInit {
  dataSource: MatTableDataSource<MetodoPago> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form: FormGroup;
  filtro: string = '';

  constructor(
    private mpS: MetodoPagoService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.form = fb.group({
      cajita: [''],
    });
  }

  ngOnInit(): void {
    this.mpS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

      // Definir el criterio de filtrado
      this.dataSource.filterPredicate = (data: MetodoPago, filter: string) => {
        return data.tipo.toLowerCase().includes(filter);
      };
    });
  }

  aplicarfiltro() {
    this.dataSource.filter = this.filtro.trim().toLowerCase();
  }
}
