import { NombreCortoPipe } from './nombre-corto.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    NombreCortoPipe
  ],
  imports: [
    CommonModule
  ], 
  exports: [NombreCortoPipe]
})
export class PipeModule { }
