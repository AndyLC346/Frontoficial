import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarMetodoPagoComponent } from './listar-metodo-pago/listar-metodo-pago.component';
 
@Component({
  selector: 'app-metodo-pago',
  standalone: true,
  imports: [RouterOutlet, ListarMetodoPagoComponent],
  templateUrl: './metodo-pago.component.html',
  styleUrl: './metodo-pago.component.css',
})
export class MetodoPagoComponent {
  constructor(public route: ActivatedRoute) {}
}
