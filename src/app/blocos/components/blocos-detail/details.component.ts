import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Bloco } from 'src/app/model/bloco';
import { BlocosService } from '../blocos.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  bloco: Bloco = {
    id: '',
    nome: '',
    data: '',
    regional: '',
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
  };
  subscription: Subscription = new Subscription();

  constructor(
    private blocosService: BlocosService,
    private routes: ActivatedRoute,
    private location: Location
  ) {
    const key = this.routes.snapshot.params['key'];
    console.log(key);
    this.subscription = this.blocosService.findOne(key).subscribe((x: any) => this.bloco = x);
  }

  ngOnInit(): void {}

  onCancel() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
