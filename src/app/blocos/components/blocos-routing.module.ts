import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './blocos-detail/details.component';
import { BlocosListAdmComponent } from './blocos-list-adm/blocos-list-adm.component';
import { BlocosListDateRegionalComponent } from './blocos-list-date-regional/blocos-list-date-regional.component';
import { BlocosListDateComponent } from './blocos-list-date/blocos-list-date.component';
import { BlocosListUserComponent } from './blocos-list-user/blocos-list-user.component';

const routes: Routes = [
  { path: 'adm', component: BlocosListAdmComponent },
  { path: 'user', component: BlocosListUserComponent },
  { path: 'date', component: BlocosListDateComponent },
  { path: 'date-regional', component: BlocosListDateRegionalComponent },
  {
    path: 'forms',
    loadChildren: () =>
      import('src/app/blocos/components/blocos-form/bloco-form.module').then(
        (m) => m.BlocoFormModule
      ),
  },
  { path: 'details/:key', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
