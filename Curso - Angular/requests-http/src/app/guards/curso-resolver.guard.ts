import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { Cursos2Service } from '../cursos/cursos2.service';


type CursoEditOrNewTypes = {
  id: number | null,
  nome: string | null
}

export const CursoResolverGuard: ResolveFn<CursoEditOrNewTypes> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  if (route.params && route.params['id']) {
    return inject(Cursos2Service).loadByID(route.params['id']);
  }

  return of({
    id: null,
    nome: null
  });

};

