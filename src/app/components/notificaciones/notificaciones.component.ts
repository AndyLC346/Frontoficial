import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ListarNotificacionesComponent } from './listar-notificaciones/listar-notificaciones.component';
 
@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [RouterModule, ListarNotificacionesComponent],
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.css',
})
export class NotificacionesComponent {
  constructor(public route: ActivatedRoute) {}
}
