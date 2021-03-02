import { IconPipe } from './icon.pipe';
import { NombreCortoPipe } from './nombre-corto.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    NombreCortoPipe,
    IconPipe
  ],
  imports: [
    CommonModule
  ], 
  exports: [NombreCortoPipe, IconPipe]
})
export class PipeModule { }
