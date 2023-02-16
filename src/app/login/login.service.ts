import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  users: User[] = [];
  auth: string = '';
  userLogin: User[] = [
    { id: 1, user: '2023', password: '2023', role: 'user' },
    { id: 2, user: '564', password: '123456', role: 'adm' },
  ];

  constructor() {}

  userAuth(user: Partial<User>): string {
    if (user.user === '2023' && user.password === '2023') {
      this.auth = 'user';
      return this.auth;
    }
    if (user.user === '564' && user.password === '123456') {
      this.auth = 'adm';
      return this.auth;
    }
    return '';
  }
}
