import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CarritoCompra } from '../../../models/carritocompra';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarritocompraproductoService } from '../../../services/carritocompraproducto.service';
import { CarritocompraService } from '../../../services/carritocompra.service';
import { CarritoCompraProducto } from '../../../models/carritocompraproducto';


@Component({
  selector: 'app-insertareditarcarritos',
  providers: [provideNativeDateAdapter()],

  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './insertareditarcarritos.component.html',
  styleUrl: './insertareditarcarritos.component.css'
})
export class InsertareditarcarritosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  
  carritos: CarritoCompraProducto = new CarritoCompraProducto();

  listaCarritos:CarritoCompra[]=[]

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private cS: CarritocompraproductoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ccS: CarritocompraService,

    


  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      estadi: ['', Validators.required],
      carri: ['', Validators.required],
    });

   this.ccS.list().subscribe(data=>{
      this.listaCarritos=data
    })


  }
  aceptar() {
    if (this.form.valid) {
      this.carritos.idCarritoCompraProducto = this.form.value.codigo;
      this.carritos.estado= this.form.value.estadi;
      this.carritos.carritoCompra.idCarritoCompra= this.form.value.carri;

      if (this.edicion) {
        //actualizar
        this.cS.update(this.carritos).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        //insertar
        this.cS.insert(this.carritos).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['carritocompraproducto']);
    }
  }
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idCarritoCompraProducto),
          estadi: new FormControl(data.estado),
          carri: new FormControl(data.carritoCompra.idCarritoCompra),
        });
      });
    }
  }

    cancelar() {
    this.router.navigate(['carritocompraproducto']);
  }
}
