import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase, AngularFireList
} from '@angular/fire/compat/database';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Desvios } from 'src/app/model/desvio';
import { DesviosService } from '../desvios.service';

@Component({
  selector: 'app-list-desvios',
  templateUrl: './list-desvios.component.html',
  styleUrls: ['./list-desvios.component.scss'],
})
export class ListDesviosComponent implements OnInit {
  desviosFire$: Observable<any[]>;
  queryField = new FormControl();
  value: string = '';
  regionais: string[] = [];
  regional: string = 'GERAL';
  contador: number = 0;
  bloco: any;
  itemsRef: AngularFireList<any>;

  constructor(
    private desviosService: DesviosService,
    private router: Router,
    private db: AngularFireDatabase
  ) {
    this.itemsRef = this.db.list('desvios/');
    this.desviosFire$ = this.itemsRef.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
      ),
      map((result: any) =>
        result.sort((a: any, b: any) => a.nome.localeCompare(b.nome))
      )
    );

    this.desviosService
      .listFire()
      .pipe(tap((desvios: Desvios) => (this.contador = desvios.length)))
      .subscribe();
  }

  load() {
    this.desviosFire$ = this.desviosService
      .listFire()
      .pipe(
        map((result) =>
          result.sort((a: any, b: any) => a.nome.localeCompare(b.nome))
        )
      );
    this.desviosFire$.subscribe(
      (desvios: Desvios) => (this.contador = desvios.length)
    );

    this.queryField.reset();
  }

  onSearch() {
    let value = this.queryField.value;
    if (value && (value = value.trim()) !== '') {
      this.desviosFire$ = this.desviosService.listFire().pipe(
        map((desvios) =>
          desvios.filter((desvio: any) =>
            desvio.linha.includes(value.toUpperCase())
          )
        ),
        map((result) =>
          result.sort((a: any, b: any) => a.linha.localeCompare(b.linha))
        ),
        tap((desvios: Desvios) => (this.contador = desvios.length))
      );
    }
  }

  ngOnInit(): void {}

  counter() {
    this.desviosService
      .listFire()
      .pipe(
        map((result) =>
          result.sort((a: any, b: any) => a.linha.localeCompare(b.linha))
        ),
        map((desvios: Desvios) => (this.contador = desvios.length))
      )
      .subscribe();
  }

  ngOnDestroy(): void {}

  listFire() {
    this.desviosService
      .listFire()
      .subscribe((x: any) => (this.desviosFire$ = x));
  }
}
