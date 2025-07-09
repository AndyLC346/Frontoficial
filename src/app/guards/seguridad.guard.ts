import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const seguridadGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
    const lService=inject(LoginService)
    const router=inject(Router)
    const autenticado=lService.verificar();
    const roles = lService.showRole();
    
    if(!autenticado){
      router.navigate(['/login']);
      return false;
    }

    const rolesPermitidos = route.data['rolesPermitidos'] as string[];

    if (rolesPermitidos && !rolesPermitidos.includes(roles)) {
    router.navigate(['/no-autorizado']);
    return false;
  }

  return true;
};