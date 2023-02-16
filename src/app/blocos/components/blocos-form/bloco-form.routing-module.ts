import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlocosFormComponent } from './form/blocos-form.component';
import { BlocoResolver } from './guards/bloco.resolver';

const routes: Routes = [

  {
    path: 'new',
    component: BlocosFormComponent,
    resolve: { bloco: BlocoResolver },
  },
  {
    path: 'edit/:key',
    component: BlocosFormComponent,
    resolve: {  bloco: BlocoResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlocoFormRoutingModule {}
