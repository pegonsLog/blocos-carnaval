import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { IconPipe } from './pipes/icon.pipe';

@NgModule({
  declarations: [ErrorDialogComponent, IconPipe],
  imports: [CommonModule, AngularMaterialModule],
  exports: [ErrorDialogComponent, IconPipe],
})
export class SharedModule {}
