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
import { Tienda } from '../../../models/tienda';
import { TiendaService } from '../../../services/tienda.service';

@Component({
  selector: 'app-insertareditarproducto',
  templateUrl: './insertareditarproducto.component.html',
  styleUrl: './insertareditarproducto.component.css',
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
  ]
})
export class InsertareditarproductoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  producto: Producto = new Producto();
  id: number = 0;
  actualizacion: boolean = false;
  listaTienda: Tienda[] = [];

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Tecnologia', viewValue: 'Tecnologia' },
    { value: 'Hogar', viewValue: 'Hogar' },
    { value: 'Calzado', viewValue: 'Calzado' },
    { value: 'Ropa', viewValue: 'Ropa' },
    { value: 'Entretenimiento', viewValue: 'Entretenimiento' },
  ];

  constructor(
    private pS: ProductoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tS: TiendaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.actualizacion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigopro: [''],
      nombrepro: ['', [Validators.required, Validators.maxLength(100)]],
      descripcionPro: ['', [Validators.required, Validators.maxLength(300)]],
      precioPro: ['', [
        Validators.required,
        Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
        Validators.min(0.1),
        Validators.max(10000)
      ]],
      categoriaPro: ['', Validators.required],
      stockPro: ['', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.min(1),
        Validators.max(10000)
      ]],
      fechaPro: ['', Validators.required],
      tiendita: ['', Validators.required]
    });

    this.tS.list().subscribe((data) => {
      this.listaTienda = data;
    });
  }

  aceptar() {
    if (this.form.invalid) {
      this.snackBar.open('Por favor, completa todos los campos correctamente.', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    this.producto.idProducto = this.form.value.codigopro;
    this.producto.nombreProducto = this.form.value.nombrepro.trim();
    this.producto.descripcionProducto = this.form.value.descripcionPro.trim();
    this.producto.precioProducto = this.form.value.precioPro;
    this.producto.categoriaProducto = this.form.value.categoriaPro;
    this.producto.stock = this.form.value.stockPro;
    this.producto.fechaCreacionProducto = this.form.value.fechaPro;
    this.producto.tienda = { idTienda: this.form.value.tiendita } as Tienda;

    if (this.actualizacion) {
      this.pS.update(this.producto).subscribe(() => {
        this.pS.list().subscribe((data) => {
          this.pS.setList(data);
          this.snackBar.open('Producto actualizado correctamente.', 'Cerrar', {
            duration: 3000
          });
          this.router.navigate(['productos']);
        });
      });
    } else {
      this.pS.insert(this.producto).subscribe(() => {
        this.pS.list().subscribe((data) => {
          this.pS.setList(data);
          this.snackBar.open('Producto registrado correctamente.', 'Cerrar', {
            duration: 3000
          });
          this.router.navigate(['productos']);
        });
      });
    }
  }

  init() {
    if (this.actualizacion) {
      this.pS.listID(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          codigopro: new FormControl(data.idProducto),
          nombrepro: new FormControl(data.nombreProducto, [Validators.required, Validators.maxLength(100)]),
          descripcionPro: new FormControl(data.descripcionProducto, [Validators.required, Validators.maxLength(300)]),
          precioPro: new FormControl(data.precioProducto, [
            Validators.required,
            Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
            Validators.min(0.1),
            Validators.max(10000)
          ]),
          categoriaPro: new FormControl(data.categoriaProducto, [Validators.required]),
          stockPro: new FormControl(data.stock, [
            Validators.required,
            Validators.pattern('^[0-9]+$'),
            Validators.min(1),
            Validators.max(10000)
          ]),
          fechaPro: new FormControl(data.fechaCreacionProducto, [Validators.required]),
          tiendita: new FormControl(data.tienda.idTienda, [Validators.required]),
        });
      });
    }
  }

  cancelar() {
    this.router.navigate(['productos']);
  }
}
