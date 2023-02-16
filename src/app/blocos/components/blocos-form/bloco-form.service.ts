import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Bloco } from 'src/app/model/bloco';

@Injectable({
  providedIn: 'root',
})
export class BlocoFormService {
  constructor(private db: AngularFireDatabase) {}

  loadById(key: string) {
    return this.db.object<any>('blocos/' + key).valueChanges();
  }

  add(bloco: Partial<Bloco>) {
    this.db
      .list('blocos/')
      .push(bloco)
      .then((x) => console.log(x.key));
  }

  update(key: string, bloco: Partial<Bloco>) {
    this.db
      .object('blocos/' + key)
      .update(bloco)
      .then((x) => console.log(key));
  }
}
