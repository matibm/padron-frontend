import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleBreadcrumb'
})
export class TitleBreadcrumbPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let data = value;
    value == 'info_contrato' ? data = 'Información de Contrato' : null;
    value == 'crear_contrato' ? data = 'Crear Nuevo Contrato' : null
    value == 'lista_contratos' ? data = 'Lista de Contratos' : null

    return data;
  }

}
