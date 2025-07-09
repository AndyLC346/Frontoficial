import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detalle-usuario',
  imports: [
    CommonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './detalle-usuario.component.html',
  styleUrl: './detalle-usuario.component.css'
})
export class DetalleUsuarioComponent implements OnInit {
  usuario?: Usuario;

  constructor(
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.uS.listID(id).subscribe(u => (this.usuario = u));
  }

  obtenerImagenProducto(): string {
    const id = this.usuario?.idUser;
    return id ? `assets/users/${id}.jpg` : 'assets/img/default.jpg';
  }

  volver() { this.router.navigate(['/usuarios']); }

}
