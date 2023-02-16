import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BlocoFormRoutingModule } from './bloco-form.routing-module';
import { BlocosFormComponent } from './form/blocos-form.component';

@NgModule({
  declarations: [BlocosFormComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    SharedModule,
    BlocoFormRoutingModule
  ],
  exports: [BlocosFormComponent],
})
export class BlocoFormModule {}
