import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardescuentosComponent } from "./listardescuentos/listardescuentos.component";


@Component({
  selector: 'app-descuentos',
  imports: [RouterOutlet, ListardescuentosComponent],
  templateUrl: './descuentos.component.html',
  styleUrl: './descuentos.component.css'
})
export class DescuentosComponent {
 constructor(public route: ActivatedRoute) { }
}
