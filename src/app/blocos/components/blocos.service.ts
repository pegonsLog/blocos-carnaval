import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList
} from '@angular/fire/compat/database';
import { map, Observable, Subscription } from 'rxjs';
import { Bloco, Blocos } from '../../model/bloco';

@Injectable({
  providedIn: 'root',
})
export class BlocosService {
  private readonly REGIONAIS = [
    'BARREIRO',
    'OESTE',
    'NOROESTE',
    'PAMPULHA',
    'CENTRO',
    'SUL',
    'LESTE',
    'NORDESTE',
    'VENDA NOVA',
    'NORTE',
  ];

  private readonly DATAS = [
    '27/01',
    '28/01',
    '02/02',
    '03/02',
    '04/02',
    '06/02',
    '07/02',
    '08/02',
    '09/02',
    '10/02',
    '11/02',
    '12/02',
    '13/02',
    '14/02',
    '17/02',
    '18/02',
    '20/02',
   ];

  subscription: Subscription = new Subscription();
  blocos: Blocos = [];
  items;
  itemsRef: AngularFireList<any>;
  itemsFire: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.items = this.db.list<any>('blocos').valueChanges();

    this.itemsRef = this.db.list('blocos');
    this.itemsFire = this.itemsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  listFire() {
    return this.itemsFire;
  }
  listFireDate(date: string) {
    return this.items.pipe(
      map((blocos: Blocos) =>
        blocos.filter((bloco: Bloco) => bloco.data === date)
      )
    );
  }

  findOne(key: string) {
    return this.db.object<Bloco>('blocos/' + key).valueChanges();
  }

  regionais() {
    return this.REGIONAIS;
  }

  datas() {
    return this.DATAS;
  }

  delete(key: string) {

   return this.db.object(`blocos/${key}`).remove();
  }
}
