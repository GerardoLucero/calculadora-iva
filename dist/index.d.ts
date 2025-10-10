/**
 * Calcula el IVA de una cantidad
 * @param {number} subtotal - Cantidad sin IVA
 * @param {number} tasa - Tasa de IVA (default: 16%)
 * @returns {Object} Cálculo completo
 */
export function calcularIVA(subtotal: number, tasa?: number): any;
/**
 * Calcula el subtotal desde un total que ya incluye IVA
 * @param {number} total - Cantidad con IVA incluido
 * @param {number} tasa - Tasa de IVA utilizada (default: 16%)
 * @returns {Object} Desglose del cálculo
 */
export function calcularSubtotal(total: number, tasa?: number): any;
/**
 * Calcula el total sumando IVA al subtotal
 * @param {number} subtotal - Cantidad sin IVA
 * @param {number} tasa - Tasa de IVA (default: 16%)
 * @returns {number} Total con IVA
 */
export function calcularTotal(subtotal: number, tasa?: number): number;
/**
 * Calcula IVA para múltiples conceptos
 * @param {Array} conceptos - Array de objetos {subtotal, tasa?}
 * @returns {Object} Resumen de todos los conceptos
 */
export function calcularIVAMultiple(conceptos: any[]): any;
/**
 * Obtiene las tasas de IVA vigentes en México
 * @returns {Object} Tasas de IVA
 */
export function obtenerTasasIVA(): any;
/**
 * Determina si un producto/servicio está exento de IVA
 * @param {string} categoria - Categoría del producto/servicio
 * @returns {boolean} True si está exento
 */
export function estaExento(categoria: string): boolean;
export const IVA_GENERAL: number;
export const IVA_FRONTERA: number;
export const IVA_EXENTO: number;
declare namespace _default {
    export { calcularIVA };
    export { calcularSubtotal };
    export { calcularTotal };
    export { calcularIVAMultiple };
    export { obtenerTasasIVA };
    export { estaExento };
    export { IVA_GENERAL };
    export { IVA_FRONTERA };
    export { IVA_EXENTO };
}
export default _default;
