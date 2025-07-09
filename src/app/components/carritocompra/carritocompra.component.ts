import { Component } from '@angular/core';
import { ListarcarritocompraComponent } from './listarcarritocompra/listarcarritocompra.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { OrdencarritocompraComponent } from './ordencarritocompra/ordencarritocompra.component';

@Component({
  selector: 'app-carritocompra',
  imports: [ListarcarritocompraComponent, RouterOutlet],
  templateUrl: './carritocompra.component.html',
  styleUrl: './carritocompra.component.css'
})
export class CarritocompraComponent {
  constructor(public route: ActivatedRoute){}
}
