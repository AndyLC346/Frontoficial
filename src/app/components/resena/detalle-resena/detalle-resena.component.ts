import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Resena } from '../../../models/resena';
import { ActivatedRoute, Router } from '@angular/router';
import { ResenaService } from '../../../services/resena.service';

@Component({
  selector: 'app-detalle-resena',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './detalle-resena.component.html',
  styleUrl: './detalle-resena.component.css'
})
export class DetalleResenaComponent implements OnInit{

  resena?: Resena;
  estrellasLlenas: number[] = [];
  estrellasVacias: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private rService: ResenaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.rService.listID(id).subscribe(data => {
      this.resena = data;
      const llenas = data.calificacion ?? 0;
      this.estrellasLlenas = Array(llenas).fill(0);
      this.estrellasVacias = Array(5 - llenas).fill(0);
    });
  }

  volver() {
    this.router.navigate(['/resenas']);
  }

}
