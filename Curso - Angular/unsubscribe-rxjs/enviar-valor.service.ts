import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnviarValorService {

  private emirror$ = new Subject<string>();

  emitirValor(valor: string){
    this.emirror$.next(valor);
  }

  getValor (){
    return this.emirror$.asObservable();
  }

}
