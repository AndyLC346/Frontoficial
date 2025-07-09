import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListaresenaComponent } from './listaresena/listaresena.component';

@Component({
  selector: 'app-resena',
  imports: [ListaresenaComponent, RouterOutlet],
  templateUrl: './resena.component.html',
  styleUrl: './resena.component.css'
})
export class ResenaComponent {
  constructor(public route: ActivatedRoute) { }
}
