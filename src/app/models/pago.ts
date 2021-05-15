import { Producto } from './producto';
import { Contrato } from './contrato';
import { Cuota } from './cuota';
import { Usuario } from "./usuario";

export class Factura {
    constructor(
        public id_movimiento?: string,

        public comentario?: string,
        public responsable?: Usuario,
        public cobrador?: Usuario,
        public vendedor?: Usuario,
        public producto?: Producto,
        public contrato?: Contrato,
        public fecha_creacion?: number,
        public activo?: boolean,
        public nro_timbrado?: string,
        public nro_factura?: string,
        public numero?: string

    ) {

    }
}