import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Chats } from '../../../models/chat';
import { Usuario } from '../../../models/usuario';
import { Tienda } from '../../../models/tienda';
import { ChatService } from '../../../services/chat.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { TiendaService } from '../../../services/tienda.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MatNativeDateModule } from '@angular/material/core';
import { SpeechRecognitionService } from '../../../services/speech-recognition.service';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insertareditarchat',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatNativeDateModule,
    MatSnackBarModule,
    RouterLink,
  ],
  templateUrl: './insertareditarchat.component.html',
  styleUrl: './insertareditarchat.component.css',
})
export class InsertareditarchatComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  chat: Chats = new Chats();

  listaUsuarios: Usuario[] = [];
  listaTiendas: Tienda[] = [];

  id: number = 0;
  edicion: boolean = false;

  private subscripcion!: Subscription;

  constructor(
    private cS: ChatService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tS: TiendaService,
    private uS: UsuarioService,
    private speechService: SpeechRecognitionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      content: ['', [Validators.required, Validators.maxLength(300)]],
      fechita: ['', Validators.required],
      usuarii: ['', Validators.required],
      tiendita: ['', Validators.required],
    });

    this.tS.list().subscribe((data) => {
      this.listaTiendas = data;
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.subscripcion = this.speechService.getTranscriptObservable().subscribe((texto) => {
      this.form.get('content')?.setValue(texto);
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.chat.idChat = this.form.value.codigo;
      this.chat.contenido = this.form.value.content;
      this.chat.fechaInicioChat = this.form.value.fechita;
      this.chat.user.idUser = this.form.value.usuarii;
      this.chat.tienda.idTienda = this.form.value.tiendita;

      if (this.edicion) {
        this.cS.update(this.chat).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
            this.snackBar.open('Chat actualizado correctamente', 'Cerrar', {
              duration: 3000,
            });
          });
        });
      } else {
        this.cS.insert(this.chat).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
            this.snackBar.open('Chat registrado correctamente', 'Cerrar', {
              duration: 3000,
            });
          });
        });
      }

      this.router.navigate(['chats']);
      this.speechService.limpiarTextoReconocido();
    } else {
      this.snackBar.open('Por favor completa todos los campos correctamente', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          codigo: [data.idChat],
          content: [data.contenido, [Validators.required, Validators.maxLength(300)]],
          fechita: [data.fechaInicioChat, Validators.required],
          usuarii: [data.user.idUser, Validators.required],
          tiendita: [data.tienda.idTienda, Validators.required],
        });
      });
    }
  }

  cancelar() {
    this.router.navigate(['chats']);
  }

  iniciarReconocimiento() {
    this.speechService.startListening();
  }

  detenerReconocimiento() {
    this.speechService.stopListening();
  }

  ngOnDestroy(): void {
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
    this.speechService.stopListening();
    this.speechService.limpiarTextoReconocido();
  }
}
