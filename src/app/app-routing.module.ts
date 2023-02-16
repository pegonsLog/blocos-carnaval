import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },

  {
    path: 'blocos',
    loadChildren: () =>
      import('src/app/blocos/components/blocos.module').then(
        (m) => m.BlocosModule
      ),
  },
  {
    path: 'desvios',
    loadChildren: () =>
      import('src/app/desvios/desvios.module').then((m) => m.DesviosModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
