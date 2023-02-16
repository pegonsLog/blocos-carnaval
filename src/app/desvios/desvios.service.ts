import { Injectable } from '@angular/core';
import {
  AngularFireList,
  AngularFireDatabase,
} from '@angular/fire/compat/database';
import { Subscription, Observable, map } from 'rxjs';
import { Desvio } from '../model/desvio';

@Injectable({
  providedIn: 'root',
})
export class DesviosService {
  subscription: Subscription = new Subscription();
  desvios: Desvio[] = [];
  items;
  itemsRef: AngularFireList<any>;
  itemsFire: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.items = this.db.list<any>('desvios').valueChanges();

    this.itemsRef = this.db.list('desvios');
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

  findOne(key: string) {
    return this.db.object<Desvio>('desvios/' + key).valueChanges();
  }

  delete(key: string) {
    return this.db.object(`desvios/${key}`).remove();
  }
}
