import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-menu',
  standalone:true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterLink,
    MatGridListModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  
nombreUsuario: string = 'Admin';
role: string = '';

  constructor(private loginService: LoginService) {}
  cerrar() {
    
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/login'; 
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  isCliente() {
    return this.role === 'Cliente';        
  }

  isGerente() {
    return this.role === 'Gerente';
  }

ngOnInit() {
  this.role = this.loginService.showRole();
}

 isMuted = true; // comienza silenciado
 volumenPersonalizado = 0.1; // para poner la cantidad de volumen

  tiles = [
    { label: 'PRODUCTO', icon: 'inventory_2', link: '/productos' },
    { label: 'DESCUENTO', icon: 'percent', link: '/descuentos' },
    { label: 'COMPARADOR', icon: 'compare_arrows', link: '/comparador' },
    { label: 'CHAT PROVEEDOR', icon: 'chat', link: '/chat' },
    { label: 'COMENTARIOS', icon: 'forum', link: '/comentarios' },
    { label: 'METODO PAGO', icon: 'payments', link: '/metodopago' },
    { label: 'TIENDA', icon: 'store', link: '/tiendas' },
    { label: 'USUARIOS', icon: 'people', link: '/usuarios' },
    { label: 'NOTIFICACIONES', icon: 'notifications', link: '/notificaciones' },
    { label: 'RESEÑAS', icon: 'rate_review', link: '/resenas' },
    { label: 'CARRITO COMPRA', icon: 'shopping_cart', link: '/carritocompra' },
    { label: 'CARRITO COMPRA', icon: 'shopping_cart', link: '/carritocompraproducto' },
    { label: 'CHATS', icon: 'shopping_cart', link: '/chat' }

  ];
}
