# Cuatro webs, un solo HTML

Las tres páginas de esta carpeta son **exactamente las mismas** en los cuatro ejemplos. Lo único que cambia es el archivo CSS al que apuntan.

Para cambiar de aspecto, abre los tres HTML y cambia esta línea del `<head>`:

```html
<link rel="stylesheet" href="estilos/1-ficha.css">
```

por cualquiera de estas:

```html
<link rel="stylesheet" href="estilos/2-cartel.css">
<link rel="stylesheet" href="estilos/3-cuaderno.css">
<link rel="stylesheet" href="estilos/4-indice.css">
```

Guarda, recarga el navegador, y la web es otra. **El contenido no se ha tocado.**

## Los cuatro

| | Para quién | Lo que hace distinto |
|---|---|---|
| **1 · Ficha** | Todo el mundo. El del taller. | Columna de 640px, serif, líneas finas. |
| **2 · Cartel** | Obra visual, poca letra. | Nombre a 68px, fondo oscuro, un naranja. |
| **3 · Cuaderno** | Más texto que imagen. | Columna de 540px, cursivas, línea al margen. |
| **4 · Índice** | Mucha obra, listada. | Monoespaciada, denso, imágenes pequeñas. |

## La regla que se cumple en los cuatro

**Solo usan propiedades que se dan en el taller.** Nada de Grid, nada de variables, nada de JavaScript. Todo lo que ves aquí se puede escribir con la chuleta delante.

Eso es lo que hay que enseñar: no es que falte nivel para hacer cosas bonitas, es que con estas veinte propiedades ya se llega. Lo demás es criterio, no técnica.

## Cómo usarlo en clase

Al principio de la sesión 2, enseña los cuatro y que cada persona elija cuál se parece más a lo que quiere. Luego construyen el suyo desde cero, pero ya con una dirección tomada. **Evita la parálisis del folio en blanco**, que es lo que más tiempo come en esa sesión.
