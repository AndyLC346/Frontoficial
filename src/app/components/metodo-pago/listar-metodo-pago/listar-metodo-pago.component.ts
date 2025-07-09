import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MetodoPago } from '../../../models/metodo-pago';
import { MetodoPagoService } from '../../../services/metodo-pago.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-metodo-pago',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './listar-metodo-pago.component.html',
  styleUrl: './listar-metodo-pago.component.css',
})
export class ListarMetodoPagoComponent implements OnInit {
  dataSource: MatTableDataSource<MetodoPago> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private mpS: MetodoPagoService) { }

  ngOnInit(): void {
    this.mpS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.mpS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.mpS.delete(id).subscribe(() => {
      this.mpS.list().subscribe((data) => {
        this.mpS.setList(data);
      });
    });
  }
}
