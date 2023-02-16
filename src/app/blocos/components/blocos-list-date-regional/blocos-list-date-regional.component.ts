import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, Subscription, tap } from 'rxjs';
import { Bloco, Blocos } from 'src/app/model/bloco';
import { BlocosService } from '../blocos.service';

@Component({
  selector: 'app-blocos-list-date-regional',
  templateUrl: './blocos-list-date-regional.component.html',
  styleUrls: ['./blocos-list-date-regional.component.scss'],
})
export class BlocosListDateRegionalComponent implements OnInit {
  queryField = new FormControl();
  value: string = '';
  regionais: string[] = [];
  data: string = '';
  contador: number = 0;
  bloco: any;
  subscription: Subscription = new Subscription();
  desfile: any = null;
  blocosFire$: Observable<any[]>;
  itemsRef: AngularFireList<any>;

  constructor(
    private blocosService: BlocosService,
    private router: Router,
    private location: Location,
    private db: AngularFireDatabase
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.data = navigation?.extras?.state?.['value'];

    this.itemsRef = this.db.list('blocos/');
    this.blocosFire$ = this.itemsRef.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
      ),
      map((blocos) =>
        blocos.filter((bloco: Bloco) => bloco.data === this.data)
      ),
      map((result: any) =>
        result.sort((a: any, b: any) => a.nome.localeCompare(b.nome))
      ),
      tap((blocos: Blocos) => (this.contador = blocos.length))
    );

    // this.blocosService
    //   .listFireDate(this.data)
    //   .pipe(
    //     map((blocos) =>
    //       blocos.filter((bloco: Bloco) => bloco.data === this.data)
    //     ),
    //     tap((blocos: Blocos) => (this.contador = blocos.length))
    //   )
    //   .subscribe();
  }

  findOne(key: string) {
    this.router.navigate(['blocos/details', key]);
  }

  forByRegional(regional: string) {
    this.itemsRef = this.db.list('blocos/');
    this.blocosFire$ = this.itemsRef.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
      ),
      map((blocos) =>
        blocos.filter((bloco: Bloco) => bloco.regional === regional && bloco.data === this.data)
      ),
      map((result: any) =>
        result.sort((a: any, b: any) => a.nome.localeCompare(b.nome))
      ),
      tap((blocos: Blocos) => (this.contador = blocos.length))
    );
  }

  forDateList(data: string) {
    this.subscription = this.blocosService
      .listFire()
      .pipe(
        map((blocos: Blocos) =>
          blocos.filter((bloco: Bloco) => (bloco.data = data))
        )
      )
      .subscribe((blocos: any) => (this.blocosFire$ = blocos));
  }

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.regionais = this.blocosService.regionais();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
