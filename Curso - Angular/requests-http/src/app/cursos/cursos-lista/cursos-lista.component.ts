import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from '../curso';
import { Observable, Subject, catchError, empty, switchMap, take } from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  deleteModalRef?: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  cursoSelecionado!: Curso;

  constructor(
    private service: Cursos2Service,
    private alertModalService: AlertModalService,
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.onRefresh();
  }
  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      catchError(error => {
        console.log(error);
        this.handleError();
        return empty();
      })
    );
  }
  handleError() {
    this.alertModalService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(curso: any) {
  this.cursoSelecionado = curso;
  const result$ = this.alertModalService.showConfirm('Confirmacao', 'Tem certeza que deseja remover o curso?');
  result$.pipe(
    take(1),
    switchMap(result => (result ? this.service.remove(curso.id) : empty()))
  ).subscribe(
    success => {
      this.onRefresh();
    },
    error => {
      this.alertModalService.showAlertDanger('Erro ao remover cursos. Tente novamente mais tarde.');
    }
  );
}


  onConfirmDelete() {
    this.service.remove(this.cursoSelecionado)
      .subscribe(
        sucess => {
          this.onRefresh();
          this.deleteModalRef?.hide();
        },
        error => {
          this.alertModalService.showAlertDanger('Erro ao remover cursos. Tente novamente mais tarde.');
          this.deleteModalRef?.hide();
        }
      );
  }

  onDeclineDelete() {
    this.deleteModalRef?.hide();
  }
}
