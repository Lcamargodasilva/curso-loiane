import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Cursos2Service } from '../cursos2.service';


@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css']
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: Cursos2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');

      let msgSuccess = 'Curso criado com sucesso.';
      let msgError = 'Erro ao criar Curso, tente novamente!';

      if (this.form.value.id) {
        msgSuccess = 'Curso editado com sucesso.';
        msgError = 'Erro ao editar Curso, tente novamente!';
      }

      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        error => { this.modal.showAlertDanger(msgError) }
      );
    }
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();

  }

}
