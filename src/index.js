/**
 * Calculadora de IVA (Impuesto al Valor Agregado) México
 * Maneja las 3 tasas oficiales: 16%, 8% y 0%
 * 
 * @author Gerardo Lucero
 * @version 1.0.0
 */

// Tasas de IVA en México
const TASAS_IVA = {
  GENERAL: 0.16,      // 16% - Tasa general
  FRONTERA: 0.08,     // 8% - Zona fronteriza
  EXENTO: 0.00        // 0% - Exento o tasa 0%
};

/**
 * Calcula el IVA de una cantidad
 * @param {number} subtotal - Cantidad sin IVA
 * @param {number} tasa - Tasa de IVA (default: 16%)
 * @returns {Object} Cálculo completo
 */
export function calcularIVA(subtotal, tasa = TASAS_IVA.GENERAL) {
  if (!subtotal || subtotal < 0) {
    throw new Error('El subtotal debe ser un número positivo');
  }
  
  if (tasa < 0 || tasa > 1) {
    throw new Error('La tasa debe estar entre 0 y 1 (ejemplo: 0.16 para 16%)');
  }
  
  const iva = subtotal * tasa;
  const total = subtotal + iva;
  
  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    tasaIVA: parseFloat((tasa * 100).toFixed(2)),
    iva: parseFloat(iva.toFixed(2)),
    total: parseFloat(total.toFixed(2))
  };
}

/**
 * Calcula el subtotal desde un total que ya incluye IVA
 * @param {number} total - Cantidad con IVA incluido
 * @param {number} tasa - Tasa de IVA utilizada (default: 16%)
 * @returns {Object} Desglose del cálculo
 */
export function calcularSubtotal(total, tasa = TASAS_IVA.GENERAL) {
  if (!total || total < 0) {
    throw new Error('El total debe ser un número positivo');
  }
  
  if (tasa < 0 || tasa > 1) {
    throw new Error('La tasa debe estar entre 0 y 1 (ejemplo: 0.16 para 16%)');
  }
  
  const subtotal = total / (1 + tasa);
  const iva = total - subtotal;
  
  return {
    total: parseFloat(total.toFixed(2)),
    tasaIVA: parseFloat((tasa * 100).toFixed(2)),
    subtotal: parseFloat(subtotal.toFixed(2)),
    iva: parseFloat(iva.toFixed(2))
  };
}

/**
 * Calcula el total sumando IVA al subtotal
 * @param {number} subtotal - Cantidad sin IVA
 * @param {number} tasa - Tasa de IVA (default: 16%)
 * @returns {number} Total con IVA
 */
export function calcularTotal(subtotal, tasa = TASAS_IVA.GENERAL) {
  const resultado = calcularIVA(subtotal, tasa);
  return resultado.total;
}

/**
 * Calcula IVA para múltiples conceptos
 * @param {Array} conceptos - Array de objetos {subtotal, tasa?}
 * @returns {Object} Resumen de todos los conceptos
 */
export function calcularIVAMultiple(conceptos) {
  if (!Array.isArray(conceptos)) {
    throw new Error('Se requiere un array de conceptos');
  }
  
  let subtotalTotal = 0;
  let ivaTotal = 0;
  const desglose = [];
  
  conceptos.forEach((concepto, index) => {
    const { subtotal, tasa = TASAS_IVA.GENERAL, descripcion = `Concepto ${index + 1}` } = concepto;
    
    const calculo = calcularIVA(subtotal, tasa);
    
    subtotalTotal += calculo.subtotal;
    ivaTotal += calculo.iva;
    
    desglose.push({
      descripcion,
      ...calculo
    });
  });
  
  return {
    conceptos: desglose,
    totales: {
      subtotal: parseFloat(subtotalTotal.toFixed(2)),
      iva: parseFloat(ivaTotal.toFixed(2)),
      total: parseFloat((subtotalTotal + ivaTotal).toFixed(2))
    }
  };
}

/**
 * Obtiene las tasas de IVA vigentes en México
 * @returns {Object} Tasas de IVA
 */
export function obtenerTasasIVA() {
  return {
    año: 2024,
    tasas: {
      general: {
        tasa: TASAS_IVA.GENERAL,
        porcentaje: '16%',
        aplicacion: 'Tasa general aplicable en todo el país'
      },
      fronteriza: {
        tasa: TASAS_IVA.FRONTERA,
        porcentaje: '8%',
        aplicacion: 'Región fronteriza norte (hasta 20 km de la frontera con EE.UU.)'
      },
      exenta: {
        tasa: TASAS_IVA.EXENTO,
        porcentaje: '0%',
        aplicacion: 'Alimentos básicos, medicinas, libros, servicios de educación y salud'
      }
    }
  };
}

/**
 * Determina si un producto/servicio está exento de IVA
 * @param {string} categoria - Categoría del producto/servicio
 * @returns {boolean} True si está exento
 */
export function estaExento(categoria) {
  const categoriasExentas = [
    'alimentos-basicos',
    'medicinas',
    'libros',
    'periodicos',
    'educacion',
    'salud',
    'transporte-publico'
  ];
  
  return categoriasExentas.includes(categoria.toLowerCase());
}

// Constantes exportadas
export const IVA_GENERAL = TASAS_IVA.GENERAL;
export const IVA_FRONTERA = TASAS_IVA.FRONTERA;
export const IVA_EXENTO = TASAS_IVA.EXENTO;

export default {
  calcularIVA,
  calcularSubtotal,
  calcularTotal,
  calcularIVAMultiple,
  obtenerTasasIVA,
  estaExento,
  IVA_GENERAL,
  IVA_FRONTERA,
  IVA_EXENTO
};
