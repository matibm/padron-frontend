import { Producto } from './producto';
import { Contrato } from './contrato';
import { Cuota } from './cuota';
import { Usuario } from "./usuario";

export class Factura {
    constructor(
        public id_movimiento?: string,
        public fecha?: string,
        public id_concepto?: string,
        public nombre_concepto?: string,
        public id_cliente?: string,
        public nom_cliente?: string,
        public debe?: number,
        public _id?: string,
        public cuota_correspondiente?: Cuota,
        public cuota_correspondiente_id?: string,
        public link_de_pago?: string,
        public haber?: number,
        public iva?: number,
        public nro_fact_fiscal?: string,
        public id_cuentacaja?: string,
        public nombre_caja?: string,
        public obs?: string,
        public vencimiento?: string,
        public contado?: string,
        public credito?: string,
        public plazo?: string,
        public nro_recibo?: string,
        public id_tipo_pago?: string,
        public nom_tipo_pago?: string,
        public nro_comp_pago?: string,
        public id_banco?: string,
        public nombre_banco?: string,
        public cerrado?: string,
        public fecha_cierre?: string,
        public id_deposito?: string,
        public id_cobrador?: string,
        public nombre_cobrador?: string,
        public cuota?: string,
        public id_operador?: string,
        public id_vendedor?: string,
        public vencimiento_cheque?: string,
        public nro_comp_banco?: string,
        public anulado?: string,
        public descuento?: string,
        public mes_a_pagar?: string,
        public vencimiento_a_pagar?: number,
        public fecha_creacion_unix?: string,
        public conciliado?: string,
        public titular?: Usuario,
        public vendedor?: Usuario,
        public cobrador?: Usuario,
        public servicio?: Producto,
        public contrato?: Contrato,
        public pagado?: boolean,
        public fecha_pagado_unix?: number,
        public fondo?: Usuario,
        public parcial?: Factura
    
    ) {

    }
}