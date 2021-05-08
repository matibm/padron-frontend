import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ruc'
})
export class RucPipe implements PipeTransform {

  constructor(private cp: CurrencyPipe) {

  }
  transform(value: string): any {
    if (!value) {
      return ''
    }

    let guion = ''
    let number: number
    let conpuntos
    if (value.includes('-')) {
      guion += value.slice(value.indexOf('-'))
      number = parseInt(value.slice(0, value.indexOf('-') - 1))
    } else {
      number = parseInt(value)
    }
    conpuntos = this.cp.transform(number, '', '', '2.0')
    console.log(conpuntos);
    
    // if (value % 1 == 0) {
    //   texto = texto.slice(0, texto.length -2 )
    // }  
    let texto = conpuntos + guion
    console.log(texto);
    
    return conpuntos ? texto : '';

  }

}
