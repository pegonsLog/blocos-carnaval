import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDesviosComponent } from './list-desvios/list-desvios.component';

const routes: Routes = [
  { path: 'list', component: ListDesviosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesviosRoutingModule { }
