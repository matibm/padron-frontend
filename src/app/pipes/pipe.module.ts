import { PrimerNombrePipe } from './primer-nombre.pipe';
import { IconPipe } from './icon.pipe';
import { NombreCortoPipe } from './nombre-corto.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    NombreCortoPipe,
    PrimerNombrePipe,
    IconPipe
  ],
  imports: [
    CommonModule
  ], 
  exports: [NombreCortoPipe, PrimerNombrePipe, IconPipe]
})
export class PipeModule { }
