import { PrimerNombrePipe } from './primer-nombre.pipe';
import { IconPipe } from './icon.pipe';
import { NombreCortoPipe } from './nombre-corto.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RucPipe } from './ruc.pipe';



@NgModule({
  declarations: [
    NombreCortoPipe,
    PrimerNombrePipe,
    IconPipe,
    RucPipe
  ],
  imports: [
    CommonModule
  ], 
  exports: [NombreCortoPipe, PrimerNombrePipe, RucPipe, IconPipe]
})
export class PipeModule { }
