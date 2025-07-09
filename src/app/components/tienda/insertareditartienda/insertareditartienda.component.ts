import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tienda } from '../../../models/tienda';
import { TiendaService } from '../../../services/tienda.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insertareditartienda',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './insertareditartienda.component.html',
  styleUrl: './insertareditartienda.component.css'
})
export class InsertareditartiendaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tienda: Tienda = new Tienda();
  id: number = 0;
  actualizacion: boolean = false;

  constructor(
    private tS: TiendaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.actualizacion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      cajita: ['', [Validators.required, Validators.maxLength(100)]],
      ubicaciontienda: ['', [Validators.required, Validators.maxLength(150)]],
      descripciontienda: ['', [Validators.required, Validators.maxLength(300)]],
      telefonotienda: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]], // Número peruano
      correotienda: ['', [Validators.required, Validators.email]],
      latitudtienda: ['', Validators.required],
      longitudtienda: ['', Validators.required]
    });
  }

  aceptar() {
    if (this.form.invalid) {
      this.snackBar.open('Por favor, completa todos los campos correctamente.', 'Cerrar', {
        duration: 4000
      });
      return;
    }

    this.tienda.idTienda = this.form.value.codigo;
    this.tienda.nombreTienda = this.form.value.cajita;
    this.tienda.ubicacion = this.form.value.ubicaciontienda;
    this.tienda.descripcionTienda = this.form.value.descripciontienda;
    this.tienda.telefonoTienda = this.form.value.telefonotienda;
    this.tienda.correoElectronico = this.form.value.correotienda;
    this.tienda.latitudTienda = this.form.value.latitudtienda;
    this.tienda.longitudTienda = this.form.value.longitudtienda;

    if (this.actualizacion) {
      this.tS.update(this.tienda).subscribe(() => {
        this.tS.list().subscribe((data) => {
          this.tS.setList(data);
          this.snackBar.open('Tienda actualizada correctamente.', 'Cerrar', { duration: 3000 });
          this.router.navigate(['tiendas']);
        });
      });
    } else {
      this.tS.insert(this.tienda).subscribe(() => {
        this.tS.list().subscribe((data) => {
          this.tS.setList(data);
          this.snackBar.open('Tienda registrada correctamente.', 'Cerrar', { duration: 3000 });
          this.router.navigate(['tiendas']);
        });
      });
    }
  }

  init() {
    if (this.actualizacion) {
      this.tS.listID(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          codigo: new FormControl(data.idTienda),
          cajita: new FormControl(data.nombreTienda, [Validators.required, Validators.maxLength(100)]),
          ubicaciontienda: new FormControl(data.ubicacion, [Validators.required, Validators.maxLength(150)]),
          descripciontienda: new FormControl(data.descripcionTienda, [Validators.required, Validators.maxLength(300)]),
          telefonotienda: new FormControl(data.telefonoTienda, [Validators.required, Validators.pattern(/^9\d{8}$/)]),
          correotienda: new FormControl(data.correoElectronico, [Validators.required, Validators.email]),
          latitudtienda: new FormControl(data.latitudTienda, Validators.required),
          longitudtienda: new FormControl(data.longitudTienda, Validators.required)
        });
      });
    }
  }

  cancelar() {
    this.router.navigate(['tiendas']);
  }
}
