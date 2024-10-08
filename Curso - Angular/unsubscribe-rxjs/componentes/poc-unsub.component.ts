import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnviarValorService } from '../enviar-valor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-poc-unsub',
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-secondary">
    </app-poc-base>
  `
})
export class PocUnsubComponent implements OnInit, OnDestroy {

  nome = 'Componente com unsubscribe';
  valor!: string;

  sub: Subscription[] = [];

  constructor(private service: EnviarValorService) { }

  ngOnInit() {
    this.sub.push(
      this.service.getValor().subscribe(novoValor => {
        this.valor = novoValor;
        console.log(this.nome, novoValor);
      })
    );
  }

  ngOnDestroy() {
    this.sub.forEach(s => s.unsubscribe());
    console.log(`${this.nome} foi destruído`);
  }
}
