# calculadora-iva

Librería moderna para calcular IVA (Impuesto al Valor Agregado) en México con las 3 tasas oficiales: 16% (general), 8% (frontera) y 0% (exento).

[![Ko-fi](https://img.shields.io/badge/Ko--fi-FF5E5B?style=flat&logo=ko-fi&logoColor=white)](https://ko-fi.com/gerardolucero)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/lucerorios0)
[![GitHub Stars](https://img.shields.io/github/stars/GerardoLucero/calculadora-iva?style=social)](https://github.com/GerardoLucero/calculadora-iva)
[![npm version](https://badge.fury.io/js/calculadora-iva.svg)](https://badge.fury.io/js/calculadora-iva)
[![npm downloads](https://img.shields.io/npm/dm/calculadora-iva.svg)](https://www.npmjs.com/package/calculadora-iva)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/GerardoLucero/calculadora-iva/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/GerardoLucero/calculadora-iva/actions)

## Features

- **3 tasas de IVA** — 16%, 8% y 0%
- **Cálculo desde subtotal** — obtener IVA y total
- **Cálculo inverso** — obtener subtotal desde total con IVA
- **Múltiples conceptos** — calcula IVA para varios productos
- **Categorías exentas** — identifica productos sin IVA
- **TypeScript ready** — incluye definiciones de tipos
- **Zero dependencies** — totalmente standalone
- **Cobertura de tests > 90%**

## Instalación

```bash
npm install calculadora-iva
```

## Uso

### Calcular IVA (desde subtotal)

```javascript
import { calcularIVA } from 'calculadora-iva';

// IVA al 16% (tasa general)
const resultado = calcularIVA(1000);
console.log(resultado);
// { subtotal: 1000, tasaIVA: 16, iva: 160, total: 1160 }

// IVA al 8% (zona fronteriza)
const frontera = calcularIVA(1000, 0.08);
console.log(frontera);
// { subtotal: 1000, tasaIVA: 8, iva: 80, total: 1080 }
```

### Calcular subtotal (desde total)

```javascript
import { calcularSubtotal } from 'calculadora-iva';

const desglose = calcularSubtotal(1160);
console.log(desglose);
// { total: 1160, tasaIVA: 16, subtotal: 1000, iva: 160 }
```

### Múltiples conceptos

```javascript
import { calcularIVAMultiple } from 'calculadora-iva';

const conceptos = [
  { subtotal: 100, tasa: 0.16, descripcion: 'Laptop' },
  { subtotal: 50, tasa: 0.16, descripcion: 'Mouse' },
  { subtotal: 200, tasa: 0, descripcion: 'Libro' } // Exento
];

const factura = calcularIVAMultiple(conceptos);
console.log(factura.totales);
// { subtotal: 350, iva: 24, total: 374 }
```

### Usar constantes

```javascript
import { calcularIVA, IVA_GENERAL, IVA_FRONTERA, IVA_EXENTO } from 'calculadora-iva';

const general = calcularIVA(1000, IVA_GENERAL);   // 16%
const frontera = calcularIVA(1000, IVA_FRONTERA); // 8%
const exento = calcularIVA(1000, IVA_EXENTO);     // 0%
```

## API

### `calcularIVA(subtotal, tasa?): Object`
### `calcularSubtotal(total, tasa?): Object`
### `calcularTotal(subtotal, tasa?): number`
### `calcularIVAMultiple(conceptos): Object`
### `obtenerTasasIVA(): Object`
### `estaExento(categoria): boolean`

## Tasas de IVA en México

| Tasa | Porcentaje | Aplicación |
|------|------------|------------|
| General | 16% | Todo el país |
| Fronteriza | 8% | Región fronteriza norte |
| Exenta | 0% | Alimentos, medicinas, libros, educación, salud |

## Licencia

MIT © [Gerardo Lucero](https://github.com/GerardoLucero)
