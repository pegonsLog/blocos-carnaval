import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Bloco } from 'src/app/model/bloco';
import { BlocoFormService } from '../bloco-form.service';

@Injectable({
  providedIn: 'root',
})
export class BlocoResolver implements Resolve<Bloco> {
  constructor(private blocoFormService: BlocoFormService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Bloco> {
    if (route.params && route.params['key']) {
      return this.blocoFormService.loadById(route.params['key']);
    }
    return of({
      id: '',
      nome: '',
      regional: '',
      data: '',
      publico: 0,
      horaConc: '',
      horaDesf: '',
      horaDisp: '',
      responsavel: '',
      telefone: '',
      localConc: '',
      localDisp: '',
      linkDOT: '',
      linkMyMaps: '',
    });
  }
}
