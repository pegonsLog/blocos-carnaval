import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  userAuth: string = '';

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService
  ) {
    this.form = this.formBuilder.group({
      user: ['2023'],
      password: ['2023'],
    });
  }

  onSubmit() {
    this.userAuth = this.loginService.userAuth(this.form.value);
    if (this.userAuth === 'user') {
      this.router.navigate(['blocos/user']);
    }
    if (this.userAuth === 'adm') {
      this.router.navigate(['blocos/adm']);
    }
    if (this.userAuth === '') {
      this.onError();
    }
  }

  clear() {
    this.form.setValue({ user: '', password: '' });
  }

  onError() {
    this.snackBar.open('Usuário ou senha inválidos!', 'X', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
