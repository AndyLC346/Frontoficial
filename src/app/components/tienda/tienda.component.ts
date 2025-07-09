import { Component } from '@angular/core';
import { ListartiendaComponent } from "./listartienda/listartienda.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tienda',
  imports: [ListartiendaComponent, RouterOutlet],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent {
  constructor(public route: ActivatedRoute){}

}
