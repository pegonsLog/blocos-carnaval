import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Bloco } from 'src/app/model/bloco';
import { BlocoFormService } from '../bloco-form.service';

@Component({
  selector: 'app-blocos-form',
  templateUrl: './blocos-form.component.html',
  styleUrls: ['./blocos-form.component.scss'],
})
export class BlocosFormComponent {
  form = this.formBuilder.group({
    id: [''],
    nome: [''],
    regional: [''],
    data: [''],
    publico: [0],
    horaConc: [''],
    horaDesf: [''],
    horaDisp: [''],
    responsavel: [''],
    telefone: [''],
    localConc: [''],
    localDisp: [''],
    linkDOT: [''],
    linkMyMaps: [''],
  });
  verificador: boolean = false;
  nomeFormulario: string = '';
  key: string = '';

  constructor(
    private blocoFormService: BlocoFormService,
    private formBuilder: NonNullableFormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private location: Location
  ) {

    const bloco: Bloco = this.route.snapshot.data['bloco'];
    this.key = this.route.snapshot.params['key'];

    if (bloco.nome) {
      this.verificador = true;
      this.nomeFormulario="ALTERAR";
    } else {
      this.verificador = false;
      this.nomeFormulario="ADICIONAR";
    }
    this.form.setValue({
      id: bloco.id,
      nome: bloco.nome,
      regional: bloco.regional,
      data: bloco.data,
      publico: bloco.publico,
      horaConc: bloco.horaConc,
      horaDesf: bloco.horaDesf,
      horaDisp: bloco.horaDisp,
      responsavel: bloco.responsavel,
      telefone: bloco.telefone,
      localConc: bloco.localConc,
      localDisp: bloco.localDisp,
      linkDOT: bloco.linkDOT,
      linkMyMaps: bloco.linkMyMaps,

    });
  }

  async onCancel() {
    this.location.back();
  }

  onSubmit() {
    if (this.verificador) {
      this.blocoFormService.update(this.key, this.form.value);
    } else {
      this.blocoFormService.add(this.form.value);
    }
    this.onClear();
  }

  // onUpdate() {
  //   this.blocoFormService.update(this.form.value).subscribe(
  //     () => this.onSuccess(),
  //     () => this.onError()
  //   );
  //   this.onClear();
  // }

  private onSuccess() {
    this.snackBar.open('Registro inserido com sucesso!', '', {
      duration: 1000,
    });
  }

  private onError() {
    this.snackBar.open('Erro na inclusão do registro!', '', { duration: 3000 });
  }

  private onClear() {
    this.form.reset();
  }
}
