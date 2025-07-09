import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Resena } from '../../../models/resena';
import { Usuario } from '../../../models/usuario';
import { Producto } from '../../../models/producto';
import { ResenaService } from '../../../services/resena.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-insertareditaresena',
  providers: [provideNativeDateAdapter()],
  standalone: true,
  templateUrl: './insertareditaresena.component.html',
  styleUrl: './insertareditaresena.component.css',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatSelectModule,
    MatDatepickerModule,
    MatSnackBarModule,
  ],
})
export class InsertareditaresenaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  resena: Resena = new Resena();
  id: number = 0;
  actualizacion: boolean = false;

  listaUsuario: Usuario[] = [];
  listaProducto: Producto[] = [];

  tipos: { value: string; viewValue: string }[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' },
    { value: '4', viewValue: '4' },
    { value: '5', viewValue: '5' },
  ];

  constructor(
    private rS: ResenaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private pS: ProductoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.actualizacion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigorese: [''],
      califresena: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comentarioresena: ['', [Validators.required, Validators.maxLength(300)]],
      fecharesena: ['', [Validators.required, this.fechaNoFuturaValidator]],
      usersito: ['', Validators.required],
      productito: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuario = data;
    });

    this.pS.list().subscribe((data) => {
      this.listaProducto = data;
    });
  }

  aceptar() {
    if (this.form.invalid) {
      this.snackBar.open('Por favor, completa todos los campos correctamente.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    this.resena.idResena = this.form.value.codigorese;
    this.resena.calificacion = this.form.value.califresena;
    this.resena.comentario = this.form.value.comentarioresena;
    this.resena.fecha = this.form.value.fecharesena;
    this.resena.user = { idUser: this.form.value.usersito } as Usuario;
    this.resena.producto = { idProducto: this.form.value.productito } as Producto;

    if (this.actualizacion) {
      this.rS.update(this.resena).subscribe(() => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
          this.snackBar.open('Reseña actualizada correctamente.', 'Cerrar', {
            duration: 3000,
          });
        });
        this.router.navigate(['resenas']);
      });
    } else {
      this.rS.insert(this.resena).subscribe(() => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
          this.snackBar.open('Reseña registrada correctamente.', 'Cerrar', {
            duration: 3000,
          });
        });
        this.router.navigate(['resenas']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['resenas']);
  }

  init() {
    if (this.actualizacion) {
      this.rS.listID(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          codigorese: this.formBuilder.control(data.idResena),
          califresena: this.formBuilder.control(data.calificacion, [Validators.required, Validators.min(1), Validators.max(5)]),
          comentarioresena: this.formBuilder.control(data.comentario, [Validators.required, Validators.maxLength(300)]),
          fecharesena: this.formBuilder.control(data.fecha, [Validators.required, this.fechaNoFuturaValidator]),
          usersito: this.formBuilder.control(data.user.idUser, Validators.required),
          productito: this.formBuilder.control(data.producto.idProducto, Validators.required),
        });
      });
    }
  }

  // ✅ Validador personalizado que impide fechas futuras
  fechaNoFuturaValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const fechaIngresada = new Date(control.value);
    const hoy = new Date();
    fechaIngresada.setHours(0, 0, 0, 0);
    hoy.setHours(0, 0, 0, 0);

    return fechaIngresada > hoy ? { fechaFutura: true } : null;
  };
}
