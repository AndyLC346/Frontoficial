import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { CommonModule } from '@angular/common';
import { MetodoPago } from '../../../models/metodo-pago';
import { Usuario } from '../../../models/usuario';
import { MetodoPagoService } from '../../../services/metodo-pago.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-insertar-editar-metodo-pago',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './insertar-editar-metodo-pago.component.html',
  styleUrl: './insertar-editar-metodo-pago.component.css',
})
export class InsertarEditarMetodoPagoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  metodoPago: MetodoPago = new MetodoPago();
  edicion: boolean = false;
  id: number = 0;
  listaUsuarios: Usuario[] = [];

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Tarjeta de Crédito', viewValue: 'Tarjeta de Crédito' },
    { value: 'Tarjeta de Débito', viewValue: 'Tarjeta de Débito' },
    { value: 'PayPal', viewValue: 'PayPal' },
    { value: 'Transferencia Bancaria', viewValue: 'Transferencia Bancaria' },
    { value: 'Yape', viewValue: 'Yape' },
    { value: 'Plin', viewValue: 'Plin' }
  ];

  constructor(
    private mpS: MetodoPagoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      id: [''],
      tipo: ['', Validators.required],
      vencimiento: ['', Validators.required],
      user: ['', Validators.required],
    });

    this.uS.list().subscribe(data => {
      this.listaUsuarios = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.metodoPago.idMetodoPago = this.form.value.id;
      this.metodoPago.tipo = this.form.value.tipo;
      this.metodoPago.vencimientoMetodo = this.form.value.vencimiento;
      this.metodoPago.user.idUser = this.form.value.user;

      if (this.edicion) {
        this.mpS.update(this.metodoPago).subscribe(() => {
          this.mpS.list().subscribe((data) => {
            this.mpS.setList(data);
          });
        });
      } else {
        this.mpS.insert(this.metodoPago).subscribe(() => {
          this.mpS.list().subscribe((data) => {
            this.mpS.setList(data);
          });
        });
      }
      this.router.navigate(['metodosdepago']);
    }
  }

  init() {
    if (this.edicion) {
      this.mpS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          id: data.idMetodoPago,
          tipo: data.tipo,
          vencimiento: data.vencimientoMetodo,
          user: data.user.idUser,
        });
      });
    }
  }


  cancelar() {
    this.router.navigate(['metodosdepago'])
  }
}
