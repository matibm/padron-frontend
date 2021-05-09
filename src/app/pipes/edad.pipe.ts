import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edad'
})
export class EdadPipe implements PipeTransform {

  transform(date: any, ...args: unknown[]): unknown {
    if (!date) {
      return null
    }
    let hoy = new Date()
    let fechaNacimiento = new Date(date)
    fechaNacimiento.setHours(5)
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    if (
      diferenciaMeses < 0 ||
      (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
    ) {
      edad--
    };

    return edad

  }

}
