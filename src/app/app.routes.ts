import { Routes } from '@angular/router';
import { TiendaComponent } from './components/tienda/tienda.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InsertareditartiendaComponent } from './components/tienda/insertareditartienda/insertareditartienda.component';
import { HomeComponent } from './components/home/home.component';
import { ProductoComponent } from './components/producto/producto.component';
import { InsertareditarproductoComponent } from './components/producto/insertareditarproducto/insertareditarproducto.component';
import { DetalleProductoComponent } from './components/producto/detalle-producto/detalle-producto.component';
import { ResenaComponent } from './components/resena/resena.component';
import { InsertareditaresenaComponent } from './components/resena/insertareditaresena/insertareditaresena.component';
import { DetalleResenaComponent } from './components/resena/detalle-resena/detalle-resena.component';
import { MenuComponent } from './components/menu/menu.component';
import { CarritocompraComponent } from './components/carritocompra/carritocompra.component';
import { InsertareditarcarritocompraComponent } from './components/carritocompra/insertareditarcarritocompra/insertareditarcarritocompra.component';
import { DescuentosComponent } from './components/descuentos/descuentos.component';
import { InsertareditardescuentosComponent } from './components/descuentos/insertareditardescuentos/insertareditardescuentos.component';
import { ListardescuentosComponent } from './components/descuentos/listardescuentos/listardescuentos.component';
import { DetalleUsuarioComponent } from './components/usuario/detalle-usuario/detalle-usuario.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { ListarNotificacionesComponent } from './components/notificaciones/listar-notificaciones/listar-notificaciones.component';
import { InsertarEditarNotificacionesComponent } from './components/notificaciones/insertar-editar-notificacioes/insertar-editar-notificacioes.component';
import { MetodoPagoComponent } from './components/metodo-pago/metodo-pago.component';
import { ListarMetodoPagoComponent } from './components/metodo-pago/listar-metodo-pago/listar-metodo-pago.component';
import { InsertarEditarMetodoPagoComponent } from './components/metodo-pago/insertar-editar-metodo-pago/insertar-editar-metodo-pago.component';
import { ChatComponent } from './components/chat/chat.component';
import { InsertareditarchatComponent } from './components/chat/insertareditarchat/insertareditarchat.component';
import { OrdencarritocompraComponent } from './components/carritocompra/ordencarritocompra/ordencarritocompra.component';
import { ListarDescuentoVigentesComponent } from './components/descuentos/listar-descuento-vigentes/listar-descuento-vigentes.component';
import { LoginComponent } from './components/login/login.component';
import { seguridadGuard } from './guards/seguridad.guard';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { ListarDescuentosOrdenadosPorPorcentajeDTO } from './models/ListarDescuentosOrdenadosXPorcentaje';
import { ListardescuentosordenadosporporcentajeComponent } from './components/descuentos/listardescuentosordenadosporporcentaje/listardescuentosordenadosporporcentaje.component';
import { BuscarproductoComponent } from './components/producto/buscarproducto/buscarproducto.component';
import { BuscartiendaComponent } from './components/tienda/buscartienda/buscartienda.component';
import { BuscaresenaComponent } from './components/resena/buscaresena/buscaresena.component';
import { OrdenarResenasComponent } from './components/resena/ordenar-resenas/ordenar-resenas.component';
import { BuscarmetodopagoComponent } from './components/metodo-pago/buscarmetodopago/buscarmetodopago.component';
import { BuscarnotificacionesComponent } from './components/notificaciones/buscarnotificaciones/buscarnotificaciones.component';
import { GraficocantidadproductosComponent } from './components/producto/graficocantidadproductos/graficocantidadproductos.component';
import { GraficocantidadmetodoComponent } from './components/metodo-pago/graficocantidadmetodo/graficocantidadmetodo.component';
import { GraficoestadousuarioComponent } from './components/usuario/graficoestadousuario/graficoestadousuario.component';
import { CarritocompraproductoComponent } from './components/carritocompraproducto/carritocompraproducto.component';
import { CompararProductoComponent } from './components/producto/comparar-producto/comparar-producto.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
   {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'registrar',
    component: RegistrarComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [seguridadGuard],
  },

  {
    path: 'menu',
    component: MenuComponent,
  },

  {
    path: 'tiendas',
    component: TiendaComponent,
    children: [
      {
        path: 'insertareditartienda',
        component: InsertareditartiendaComponent,
      },
      {
        path: 'actualizaciones/:id',
        component: InsertareditartiendaComponent,
      },
      {
        path:'buscarnombretienda',component:BuscartiendaComponent
      }
    ],
  },

  {
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      {
        path: 'detalleusua/:id',
        component: DetalleUsuarioComponent,
      },
      {
        path:'cantidadusuaractivo',component:GraficoestadousuarioComponent
      }
    ],
  },

  {
    path: 'productos',
    component: ProductoComponent,
    children: [
      {
        path: 'insertareditarprod',
        component: InsertareditarproductoComponent,
      },
      {
        path: 'actualizaproducto/:id',
        component: InsertareditarproductoComponent,
      },
      {
        path: 'detalle/:id',
        component: DetalleProductoComponent,
      },
      {
        path:'busquedanombre',component:BuscarproductoComponent
      },
      {
        path:'graficoCantidadProductos', component:GraficocantidadproductosComponent
      },
      {
        path:'compararproductos',component:CompararProductoComponent
      }
    ],
  },

  {
    path: 'resenas',
    component: ResenaComponent,
    children: [
      {
        path: 'insertareditarese',
        component: InsertareditaresenaComponent,
      },
      {
        path: 'actualizaresena/:id',
        component: InsertareditaresenaComponent,
      },
      {
        path: 'detallerese/:id',
        component: DetalleResenaComponent,
      },
      {
        path:'buscarcalificacion', component: BuscaresenaComponent
      },
      {
        path:'ordenaresena', component:OrdenarResenasComponent
      }
    ],
  },
  {
    path: 'carritocompra',
    component: CarritocompraComponent,
    children: [
      {
        path: 'insertareditarcarritocompra',
        component: InsertareditarcarritocompraComponent,
      },
      {
        path: 'editarcarrito/:id',
        component: InsertareditarcarritocompraComponent,
      },
      {
      path: 'carrito-ordenado-porPrecio',
        component: OrdencarritocompraComponent,
      },
    ],
  },
  {
    path: 'descuento',
    component: DescuentosComponent,
    children: [
      {
        path: 'insertareditardescuento',
        component: InsertareditardescuentosComponent,
      },
      {
        path: 'listadescuento',
        component: ListardescuentosComponent,
      },
      {
        path: 'editardescuento/:id',
        component: InsertareditardescuentosComponent,
      },
      {
        path: 'listar-descuento-vigentes',
        component: ListarDescuentoVigentesComponent,
      },
      {
        path: 'listardescuentosordenadosporporcentaje',
        component: ListardescuentosordenadosporporcentajeComponent,
      }
    ],
  },
  {
    path: 'notificaciones',
    component: NotificacionesComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertarEditarNotificacionesComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertarEditarNotificacionesComponent,
      },
      {
        path:'buscarleidonotifica',component:BuscarnotificacionesComponent
      }

    ],
  },


  {
    path: 'metodosdepago',
    component: MetodoPagoComponent,
    children: [
      {
        path: 'insertareditarmetodopago',
        component: InsertarEditarMetodoPagoComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertarEditarMetodoPagoComponent,
      },
      {
        path:'buscarmetodotipo',component:BuscarmetodopagoComponent
      },
      {
        path:'cantidadtipometodo', component:GraficocantidadmetodoComponent
      }

    ],
  },
  {
    path: 'chats',
    component: ChatComponent,
    children: [
      {
        path: 'insertareditarchat',
        component: InsertareditarchatComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarchatComponent,
      },
    ],
  },
  {
    path: 'carritocompraproducto',
    component: CarritocompraproductoComponent,
    children: [
      {
        path: 'insertareditarcarritos',
        component: CarritocompraproductoComponent,
      },
      {
        path: 'ediciones/:id',
        component: CarritocompraproductoComponent,
      },
    ],
  },

];
