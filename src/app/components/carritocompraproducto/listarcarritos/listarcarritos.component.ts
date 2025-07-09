import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CarritoCompraProducto } from '../../../models/carritocompraproducto';
import { CarritocompraproductoService } from '../../../services/carritocompraproducto.service';

@Component({
  selector: 'app-listarcarritos',
  imports: [MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,MatPaginator,MatPaginatorModule],
  templateUrl: './listarcarritos.component.html',
  styleUrl: './listarcarritos.component.css'
})
export class ListarcarritosComponent implements OnInit {
  dataSource: MatTableDataSource<CarritoCompraProducto> = new MatTableDataSource();

  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS: CarritocompraproductoService) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.cS.deleteA(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
}
