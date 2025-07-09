import { Component, OnInit } from '@angular/core';
import { Resena } from '../../../models/resena';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ResenaService } from '../../../services/resena.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ordenar-resenas',
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
  templateUrl: './ordenar-resenas.component.html',
  styleUrl: './ordenar-resenas.component.css'
})
export class OrdenarResenasComponent implements OnInit {

  dataSource: MatTableDataSource<Resena> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(private rS: ResenaService) { }

  ngOnInit(): void {
    this.rS.listarOrdenadasPorCalificacion().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
