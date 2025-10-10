/**
 * Tests para Calculadora de IVA
 */

import {
  calcularIVA,
  calcularSubtotal,
  calcularTotal,
  calcularIVAMultiple,
  obtenerTasasIVA,
  estaExento,
  IVA_GENERAL,
  IVA_FRONTERA,
  IVA_EXENTO
} from './index.js';

describe('Calculadora de IVA', () => {
  
  describe('calcularIVA', () => {
    it('debe calcular IVA al 16% correctamente', () => {
      const resultado = calcularIVA(100, 0.16);
      
      expect(resultado.subtotal).toBe(100);
      expect(resultado.tasaIVA).toBe(16);
      expect(resultado.iva).toBe(16);
      expect(resultado.total).toBe(116);
    });
    
    it('debe usar tasa del 16% por defecto', () => {
      const resultado = calcularIVA(1000);
      
      expect(resultado.tasaIVA).toBe(16);
      expect(resultado.iva).toBe(160);
      expect(resultado.total).toBe(1160);
    });
    
    it('debe calcular IVA al 8% (frontera)', () => {
      const resultado = calcularIVA(100, 0.08);
      
      expect(resultado.tasaIVA).toBe(8);
      expect(resultado.iva).toBe(8);
      expect(resultado.total).toBe(108);
    });
    
    it('debe calcular IVA al 0% (exento)', () => {
      const resultado = calcularIVA(100, 0);
      
      expect(resultado.tasaIVA).toBe(0);
      expect(resultado.iva).toBe(0);
      expect(resultado.total).toBe(100);
    });
    
    it('debe validar que el subtotal sea positivo', () => {
      expect(() => calcularIVA(-100)).toThrow('El subtotal debe ser un número positivo');
      expect(() => calcularIVA(0)).toThrow('El subtotal debe ser un número positivo');
      expect(() => calcularIVA(null)).toThrow('El subtotal debe ser un número positivo');
    });
    
    it('debe validar que la tasa esté entre 0 y 1', () => {
      expect(() => calcularIVA(100, -0.1)).toThrow('La tasa debe estar entre 0 y 1');
      expect(() => calcularIVA(100, 1.5)).toThrow('La tasa debe estar entre 0 y 1');
    });
    
    it('debe redondear a 2 decimales', () => {
      const resultado = calcularIVA(99.99, 0.16);
      
      const decimalesSubtotal = resultado.subtotal.toString().split('.')[1];
      const decimalesIva = resultado.iva.toString().split('.')[1];
      const decimalesTotal = resultado.total.toString().split('.')[1];
      
      expect(!decimalesSubtotal || decimalesSubtotal.length <= 2).toBe(true);
      expect(!decimalesIva || decimalesIva.length <= 2).toBe(true);
      expect(!decimalesTotal || decimalesTotal.length <= 2).toBe(true);
    });
  });
  
  describe('calcularSubtotal', () => {
    it('debe calcular subtotal desde total con IVA 16%', () => {
      const resultado = calcularSubtotal(116, 0.16);
      
      expect(resultado.total).toBe(116);
      expect(resultado.tasaIVA).toBe(16);
      expect(resultado.subtotal).toBe(100);
      expect(resultado.iva).toBe(16);
    });
    
    it('debe usar tasa del 16% por defecto', () => {
      const resultado = calcularSubtotal(1160);
      
      expect(resultado.subtotal).toBe(1000);
      expect(resultado.iva).toBe(160);
    });
    
    it('debe calcular subtotal con IVA 8%', () => {
      const resultado = calcularSubtotal(108, 0.08);
      
      expect(resultado.subtotal).toBe(100);
      expect(resultado.iva).toBe(8);
    });
    
    it('debe validar que el total sea positivo', () => {
      expect(() => calcularSubtotal(-100)).toThrow('El total debe ser un número positivo');
      expect(() => calcularSubtotal(0)).toThrow('El total debe ser un número positivo');
    });
  });
  
  describe('calcularTotal', () => {
    it('debe retornar solo el total con IVA', () => {
      const total = calcularTotal(100, 0.16);
      expect(total).toBe(116);
    });
    
    it('debe usar IVA 16% por defecto', () => {
      const total = calcularTotal(1000);
      expect(total).toBe(1160);
    });
  });
  
  describe('calcularIVAMultiple', () => {
    it('debe calcular IVA para múltiples conceptos', () => {
      const conceptos = [
        { subtotal: 100, descripcion: 'Producto 1' },
        { subtotal: 200, descripcion: 'Producto 2' },
        { subtotal: 300, descripcion: 'Producto 3' }
      ];
      
      const resultado = calcularIVAMultiple(conceptos);
      
      expect(resultado).toHaveProperty('conceptos');
      expect(resultado).toHaveProperty('totales');
      expect(resultado.conceptos).toHaveLength(3);
      expect(resultado.totales.subtotal).toBe(600);
      expect(resultado.totales.iva).toBe(96);
      expect(resultado.totales.total).toBe(696);
    });
    
    it('debe manejar diferentes tasas por concepto', () => {
      const conceptos = [
        { subtotal: 100, tasa: 0.16 },
        { subtotal: 100, tasa: 0.08 },
        { subtotal: 100, tasa: 0 }
      ];
      
      const resultado = calcularIVAMultiple(conceptos);
      
      expect(resultado.conceptos[0].iva).toBe(16);
      expect(resultado.conceptos[1].iva).toBe(8);
      expect(resultado.conceptos[2].iva).toBe(0);
      expect(resultado.totales.iva).toBe(24);
    });
    
    it('debe validar que sea un array', () => {
      expect(() => calcularIVAMultiple(100)).toThrow('Se requiere un array de conceptos');
      expect(() => calcularIVAMultiple(null)).toThrow('Se requiere un array de conceptos');
    });
    
    it('debe generar descripción automática si no se proporciona', () => {
      const conceptos = [
        { subtotal: 100 },
        { subtotal: 200 }
      ];
      
      const resultado = calcularIVAMultiple(conceptos);
      
      expect(resultado.conceptos[0].descripcion).toBe('Concepto 1');
      expect(resultado.conceptos[1].descripcion).toBe('Concepto 2');
    });
  });
  
  describe('obtenerTasasIVA', () => {
    it('debe retornar las 3 tasas de IVA', () => {
      const tasas = obtenerTasasIVA();
      
      expect(tasas).toHaveProperty('año');
      expect(tasas).toHaveProperty('tasas');
      expect(tasas.tasas).toHaveProperty('general');
      expect(tasas.tasas).toHaveProperty('fronteriza');
      expect(tasas.tasas).toHaveProperty('exenta');
      
      expect(tasas.año).toBe(2024);
      expect(tasas.tasas.general.tasa).toBe(0.16);
      expect(tasas.tasas.fronteriza.tasa).toBe(0.08);
      expect(tasas.tasas.exenta.tasa).toBe(0);
    });
  });
  
  describe('estaExento', () => {
    it('debe identificar categorías exentas', () => {
      expect(estaExento('alimentos-basicos')).toBe(true);
      expect(estaExento('medicinas')).toBe(true);
      expect(estaExento('libros')).toBe(true);
      expect(estaExento('educacion')).toBe(true);
      expect(estaExento('salud')).toBe(true);
    });
    
    it('debe identificar categorías no exentas', () => {
      expect(estaExento('electronica')).toBe(false);
      expect(estaExento('ropa')).toBe(false);
      expect(estaExento('automovil')).toBe(false);
    });
    
    it('debe ser case insensitive', () => {
      expect(estaExento('MEDICINAS')).toBe(true);
      expect(estaExento('MeDiCiNaS')).toBe(true);
    });
  });
  
  describe('Constantes', () => {
    it('debe exportar las constantes de tasas', () => {
      expect(IVA_GENERAL).toBe(0.16);
      expect(IVA_FRONTERA).toBe(0.08);
      expect(IVA_EXENTO).toBe(0);
    });
  });
  
  describe('Casos de uso reales', () => {
    it('debe calcular factura completa', () => {
      const factura = calcularIVA(5000, 0.16);
      
      expect(factura.subtotal).toBe(5000);
      expect(factura.iva).toBe(800);
      expect(factura.total).toBe(5800);
    });
    
    it('debe calcular desglose desde total', () => {
      const desglose = calcularSubtotal(5800, 0.16);
      
      expect(desglose.subtotal).toBe(5000);
      expect(desglose.iva).toBe(800);
    });
  });
});
