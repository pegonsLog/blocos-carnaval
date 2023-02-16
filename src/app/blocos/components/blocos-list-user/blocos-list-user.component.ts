import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList
} from '@angular/fire/compat/database';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Bloco, Blocos } from 'src/app/model/bloco';
import { BlocosService } from '../blocos.service';

@Component({
  selector: 'app-blocos-list',
  templateUrl: './blocos-list-user.component.html',
  styleUrls: ['./blocos-list-user.component.scss'],
})
export class BlocosListUserComponent implements OnInit, OnDestroy {
  blocosFire$: Observable<any[]>;
  queryField = new FormControl();
  value: string = '';
  regionais: string[] = [];
  regional: string = 'GERAL';
  contador: number = 0;
  bloco: any;
  itemsRef: AngularFireList<any>;

  constructor(
    private blocosService: BlocosService,
    private router: Router,
    private db: AngularFireDatabase
  )
  {
    this.itemsRef = this.db.list('blocos/');
    this.blocosFire$ = this.itemsRef.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
      ),
      map((result: any) =>
        result.sort((a: any, b: any) => a.nome.localeCompare(b.nome))
      )
    );

    this.blocosService
      .listFire()
      .pipe(tap((blocos: Blocos) => (this.contador = blocos.length)))
      .subscribe();
  }

  findOne(key: string) {
    this.router.navigate(['blocos/details', key]);
  }

  forByRegional(regional: string) {
    this.blocosFire$ = this.blocosService.listFire().pipe(
      map((blocos: Blocos) =>
        blocos.filter((bloco: Bloco) => bloco.regional === regional)
      ),
      map((result) =>
        result.sort((a: any, b: any) => a.nome.localeCompare(b.nome))
      )
    );
    this.blocosFire$.subscribe(
      (blocos: Blocos) => (this.contador = blocos.length)
    );
    this.regional = regional;
  }

  forDate() {
    this.router.navigate(['blocos/date']);
  }

  load() {
    this.blocosFire$ = this.blocosService.listFire().pipe(
      map((blocos: Blocos) =>
        blocos.filter((bloco: Bloco) => bloco.regional !== 'GERAL')
      ),
      map((result) =>
        result.sort((a: any, b: any) => a.nome.localeCompare(b.nome))
      )
    );
    this.blocosFire$.subscribe(
      (blocos: Blocos) => (this.contador = blocos.length)
    );

    this.queryField.reset();
    this.regional = 'GERAL';
  }

  onSearch() {
    let value = this.queryField.value;
    if (value && (value = value.trim()) !== '') {
      this.blocosFire$ = this.blocosService.listFire().pipe(
        map((blocos) =>
          blocos.filter((bloco: any) =>
            bloco.nome.includes(value.toUpperCase())
          )
        ),
        map((result) =>
          result.sort((a: any, b: any) => a.nome.localeCompare(b.nome))
        ),
        tap((blocos: Blocos) => (this.contador = blocos.length))
      );
    }
  }

  ngOnInit(): void {
    this.regionais = this.blocosService.regionais();
  }

  counter() {
    this.blocosService
      .listFire()
      .pipe(
        map((result) =>
          result.sort((a: any, b: any) => a.nome.localeCompare(b.nome))
        ),
        map((blocos: Blocos) => (this.contador = blocos.length))
      )
      .subscribe();
  }

  ngOnDestroy(): void {}

  listFire() {
    this.blocosService.listFire().subscribe((x: any) => (this.blocosFire$ = x));
  }


}
