import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8082';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

constructor(private http: HttpClient) {}
  login(request: JwtRequest) {
    return this.http.post('http://localhost:8082/login', request);
  }
  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }
  showRole() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      // Manejar el caso en el que el token es nulo.
      return null; // O cualquier otro valor predeterminado dependiendo del contexto.
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }

 registrar(usuario: any) {
  const body = {
    username: usuario.username,
    password: usuario.password,
    nombres: usuario.nombres, 
    apellidos: usuario.apellidos,
    emailUsuario: usuario.emailUsuario, 
    telefono: usuario.telefono
  };

  return this.http.post('http://localhost:8082/usuarios', body, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // NO pongas Authorization aquí
    }),
    withCredentials: false // tampoco es necesario
  });
}
}

