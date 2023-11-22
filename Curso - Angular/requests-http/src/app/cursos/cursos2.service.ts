import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudService<Curso>{

  constructor(public override http: HttpClient) {
    super(http, `${environment.API}cursos`);
  }
}
