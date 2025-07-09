import { Usuario } from "./usuario";

export class Notificaciones {
  idNotificacion: number = 0;
  mensaje: string = "";
  fechaEnvioNotificacion: Date = new Date();
  leido: boolean = false;
  user: Usuario = new Usuario();
}
