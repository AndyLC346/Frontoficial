import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/producto.service';
import { DescuentoService } from '../../../services/descuento.service';
import { Descuentos } from '../../../models/descuento';

// ✅ Validador personalizado de rango de fechas
function rangoFechasValidator(group: FormGroup): { [key: string]: any } | null {
  const inicio = group.get('fechaInicioDescuento')?.value;
  const fin = group.get('fechaFinDescuento')?.value;

  if (inicio && fin && new Date(inicio) > new Date(fin)) {
    return { rangoFechasInvalido: true };
  }
  return null;
}

@Component({
  selector: 'app-insertareditardescuentos',
  templateUrl: './insertareditardescuentos.component.html',
  styleUrls: ['./insertareditardescuentos.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    RouterLink,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
})
export class InsertareditardescuentosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  descuentos: Descuentos = new Descuentos();

  listaProductos: Producto[] = [];

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private dS: DescuentoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });

    this.productoService.list().subscribe((data) => {
      this.listaProductos = data;
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      porcentajeDescuento: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      codigoDescuento: ['', Validators.required],
      fechaInicioDescuento: ['', Validators.required],
      fechaFinDescuento: ['', Validators.required],
      producto: ['', Validators.required],
    }, { validators: rangoFechasValidator }); // ✅ Se aplica la validación personalizada
  }

  aceptar() {
    if (this.form.invalid) {
      if (this.form.hasError('rangoFechasInvalido')) {
        this.snackBar.open('La fecha de fin no puede ser anterior a la fecha de inicio.', 'Cerrar', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('Por favor, completa todos los campos correctamente.', 'Cerrar', {
          duration: 3000,
        });
      }
      return;
    }

    this.descuentos.idDescuento = this.form.value.codigo;
    this.descuentos.porcentajeDescuento = this.form.value.porcentajeDescuento;
    this.descuentos.codigoDescuento = this.form.value.codigoDescuento;
    this.descuentos.fechaInicioDescuento = this.form.value.fechaInicioDescuento;
    this.descuentos.fechaFinDescuento = this.form.value.fechaFinDescuento;

    this.descuentos.producto = new Producto();
    this.descuentos.producto.idProducto = this.form.value.producto;

    if (this.edicion) {
      this.dS.update(this.descuentos).subscribe(() => {
        this.dS.list().subscribe((data) => {
          this.snackBar.open('Descuento actualizado correctamente.', 'Cerrar', { duration: 3000 });
          this.dS.setList(data);
        });
        this.router.navigate(['descuento']);
      });
    } else {
      this.dS.insert(this.descuentos).subscribe(() => {
        this.dS.list().subscribe((data) => {
          this.snackBar.open('Descuento registrado correctamente.', 'Cerrar', { duration: 3000 });
          this.dS.setList(data);
        });
        this.router.navigate(['descuento']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['descuento']);
  }

  initForm() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          codigo: new FormControl(data.idDescuento),
          porcentajeDescuento: new FormControl(data.porcentajeDescuento, [Validators.required, Validators.min(1), Validators.max(100)]),
          codigoDescuento: new FormControl(data.codigoDescuento, Validators.required),
          fechaInicioDescuento: new FormControl(data.fechaInicioDescuento, Validators.required),
          fechaFinDescuento: new FormControl(data.fechaFinDescuento, Validators.required),
          producto: new FormControl(data.producto.idProducto, Validators.required),
        }, { validators: rangoFechasValidator });
      });
    }
  }
}
