import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
  preserveWhitespaces: true,
})
export class CourseFormComponent {

  form: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location
    ) {

      this.form = this.formBuilder.group({
      name: [''],
      category: [''],
    });
  }

  onSubmit(){
    this.service.save(this.form.value)
    .subscribe(result => this.onSuccess(), error => this.onError());
  }

  onCancel(){
    this.location.back();
  }

  private onSuccess(){
    this.snackBar.open('Curso salvo com sucesso!', '', {duration: 3000});
    this.onCancel();
  }

  private onError(){
    this.snackBar.open('Erro ao salvar curso!', '', {duration: 2000});
  }
}
