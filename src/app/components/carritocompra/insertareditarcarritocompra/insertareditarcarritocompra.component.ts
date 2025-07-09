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

import { CarritocompraService } from '../../../services/carritocompra.service';
import { ProductoService } from '../../../services/producto.service';
import { UsuarioService } from '../../../services/usuario.service';

import { CarritoCompra } from '../../../models/carritocompra';
import { Producto } from '../../../models/producto';
import { Usuario } from '../../../models/usuario';
import { MetodoPago } from '../../../models/metodo-pago';
import { MetodoPagoService } from '../../../services/metodo-pago.service';

@Component({
  selector: 'app-insertareditarcarritocompra',
  templateUrl: './insertareditarcarritocompra.component.html',
  styleUrls: ['./insertareditarcarritocompra.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    RouterLink,
  ],
})
export class InsertareditarcarritocompraComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  carritocompra: CarritoCompra = new CarritoCompra();

  listaUsuarios: Usuario[] = [];
  listaProductos: Producto[] = [];
  listaMetodoPago: MetodoPago[] = [];

  id: number = 0;
  edicion: boolean = false;

  maxFecha: Date = new Date(); // Limitar fecha al día actual

  constructor(
    private ccS: CarritocompraService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private productoService: ProductoService,
    private metodopagoService: MetodoPagoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      idUsuario: ['', Validators.required],
      idProducto: ['', Validators.required],
      fecha: ['', [Validators.required, Validators.max(this.maxFecha.getTime())]],
      cantidad: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      metpago: ['', Validators.required],
    });

    this.usuarioService.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.productoService.list().subscribe((data) => {
      this.listaProductos = data;
    });

    this.metodopagoService.list().subscribe((data) => {
      this.listaMetodoPago = data;
    });
  }

  aceptar() {
    if (this.form.invalid) {
      this.snackBar.open('Por favor, completa todos los campos correctamente.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    this.carritocompra.idCarritoCompra = this.form.value.codigo;
    this.carritocompra.fechaCreaCarritoCompra = this.form.value.fecha;
    this.carritocompra.cantidad = this.form.value.cantidad;

    this.carritocompra.user = new Usuario();
    this.carritocompra.user.idUser = this.form.value.idUsuario;

    this.carritocompra.producto = new Producto();
    this.carritocompra.producto.idProducto = this.form.value.idProducto;

    this.carritocompra.metodoPago = new MetodoPago();
    this.carritocompra.metodoPago.idMetodoPago = this.form.value.metpago;

    if (this.edicion) {
      this.ccS.update(this.carritocompra).subscribe(() => {
        this.ccS.list().subscribe((data) => {
          if (data.length === 0) {
            this.snackBar.open('No existen carritos de compra registrados.', 'Cerrar', { duration: 3000 });
          } else {
            this.snackBar.open('Carrito de compra actualizado correctamente.', 'Cerrar', { duration: 3000 });
          }
          this.ccS.setList(data);
        });
        this.router.navigate(['carritocompra']);
      });
    } else {
      this.ccS.insert(this.carritocompra).subscribe(() => {
        this.ccS.list().subscribe((data) => {
          if (data.length === 0) {
            this.snackBar.open('No existen carritos de compra registrados.', 'Cerrar', { duration: 3000 });
          } else {
            this.snackBar.open('Carrito de compra registrado correctamente.', 'Cerrar', { duration: 3000 });
          }
          this.ccS.setList(data);
        });
        this.router.navigate(['carritocompra']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['carritocompra']);
  }

  initForm() {
    if (this.edicion) {
      this.ccS.listID(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          codigo: new FormControl(data.idCarritoCompra),
          idUsuario: new FormControl(data.user.idUser, Validators.required),
          idProducto: new FormControl(data.producto.idProducto, Validators.required),
          fecha: new FormControl(data.fechaCreaCarritoCompra, [
            Validators.required,
            Validators.max(this.maxFecha.getTime()),
          ]),
          metpago: new FormControl(data.metodoPago.idMetodoPago, Validators.required),
          cantidad: new FormControl(data.cantidad, [
            Validators.required,
            Validators.min(1),
            Validators.max(100),
          ]),
        });
      });
    }
  }
}
