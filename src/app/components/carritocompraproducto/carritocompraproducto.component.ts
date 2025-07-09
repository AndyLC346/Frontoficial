import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcarritosComponent } from './listarcarritos/listarcarritos.component';

@Component({
  selector: 'app-carritocompraproducto',
  imports: [RouterOutlet, ListarcarritosComponent],
  templateUrl: './carritocompraproducto.component.html',
  styleUrl: './carritocompraproducto.component.css'
})
export class CarritocompraproductoComponent {
  constructor(public route: ActivatedRoute){}

}
