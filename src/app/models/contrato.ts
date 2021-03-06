import { Inhumado } from './unhumado';
import { Beneficiario } from './beneficiario';
import { Producto } from './producto';
import { Usuario } from "./usuario";

export class Contrato {
    constructor(

        public id_contrato: string,
        public nro_contrato?: string,
        public _id?: string,
        public id_titular?: string,
        public id_servicio?: string,
        public fecha_alta?: string,
        public tipo_pago?: string,
        public precio_total?: number,
        public saldo_pendiente?: number,
        public titular_alternativo?: Usuario,
        // public v2_precio_total?: number,
        public plazo?: number,
        // public v2_plazo?: string,
        public cuota?: number,
        // public v2_cuota?: string,
        public vendedor?: Usuario,
        public cobrador?: Usuario,
        public titular?: Usuario,
        public inhumados?: Inhumado[],
        public producto?: Producto,
        public beneficiarios?: Beneficiario[],
        public tipo_contrato?: string,
        public fecha_creacion_unix?: number,
        public nombre_servicio?: string,
        public nombre_beneficiario1?: string,
        public nombre_beneficiario2?: string,
        public nombre_beneficiario3?: string,
        public ci_beneficiario1?: string,
        public ci_beneficiario2?: string,
        public ci_beneficiario3?: string,
        public fecha_nac_beneficiario1?: string,
        public fecha_nac_beneficiario2?: string,
        public fecha_nac_beneficiario3?: string,
        public cuota_beneficiario1?: string,
        public cuota_beneficiario2?: string,
        public cuota_beneficiario3?: string,
        public nombre_adicional1?: string,
        public nombre_adicional2?: string,
        public nombre_adicional3?: string,
        public ci_adicional1?: string,
        public ci_adicional2?: string,
        public ci_adicional3?: string,
        public fecha_nac_adicional1?: string,
        public fecha_nac_adicional2?: string,
        public fecha_nac_adicional3?: string,
        public cuota_adicional1?: string,
        public cuota_adicional2?: string,
        public cuota_adicional3?: string,
        public cuota_mantenimiento?: string,
        public notas?: string,
        public activo?: string,
        public id_alternativo?: string,
        public nombre_alternativo?: string,
        public id_vendedor?: string,
        public id_cobrador?: string,
        public nombre_vendedor?: string,
        public nombre_cobrador?: string,
        public entrega?: number,
        public fecha_fallecimiento1?: string,
        public fecha_fallecimiento2?: string,
        public fecha_fallecimiento3?: string,
        public fecha_inhumacion1?: string,
        public fecha_inhumacion2?: string,
        public fecha_inhumacion3?: string,
        public notas_inumacion?: string,
        public ultima_cuota_pagada?: string,
        public ultimo_mes_pagado?: string,
        public ultimo_ano_pagado?: string,
        public generado_udp?: string,
        public generado_psm?: string,
        public generado_psv?: string,
        public generado_cmp?: string,
        public primer_venciemto_cmp?: string,
        public generado_acf?: string,
        public nro_inhumado1?: string,
        public nro_inhumado2?: string,
        public nro_inhumado3?: string,
        public nombre_beneficiario4?: string,
        public nombre_beneficiario5?: string,
        public nombre_beneficiario6?: string,
        public fecha_fallecimiento4?: string,
        public fecha_fallecimiento5?: string,
        public fecha_fallecimiento6?: string,
        public fecha_inhumacion4?: string,
        public fecha_inhumacion5?: string,
        public fecha_inhumacion6?: string,
        public nro_inhumado4?: string,
        public nro_inhumado5?: string,
        public nro_inhumado6?: string,
        public ci_beneficiario4?: string,
        public ci_beneficiario5?: string,
        public ci_beneficiario6?: string,
        public manzana?: string,
        public parcela?: string,
        public sector?: string,
        public fila?: string,
       

    ) {

    }
}