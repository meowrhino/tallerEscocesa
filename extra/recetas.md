# Recetas del bloque extra

Trozos listos para pegar, para el grupo que vaya más rodado. Cada uno es independiente: coge los que quieras.

**Regla al usarlos en clase:** que peguen el trozo, lo vean funcionar, y **luego** cambien los valores. Primero el resultado, después la explicación. Con este material al revés se pierde a la mitad de la sala.

---

## 1 · Variables de color

Al principio de `estilo.css`:

```css
:root {
  --tinta: #12233A;
  --papel: #FBFAF7;
  --marca: #F2E94E;
}
```

Y a partir de ahí, en cualquier regla:

```css
body   { color: var(--tinta); background-color: var(--papel); }
a:hover { background-color: var(--marca); }
```

Cambias el color en un sitio y cambia en toda la web. Es la mejora que más agradecen cuando ya tienen tres páginas hechas.

---

## 2 · Rejilla de proyectos

En el HTML, envuelve los `article` en un contenedor:

```html
<div class="rejilla">
  <article>…</article>
  <article>…</article>
</div>
```

Y en el CSS:

```css
.rejilla {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 28px;
}
```

`auto-fill` con `minmax` se adapta solo al ancho de la pantalla, **sin media queries**. Enséñalo estrechando la ventana: es de las pocas cosas de CSS que producen un "ah" inmediato.

---

## 3 · Modo claro y oscuro

Botón, al principio del `<body>`:

```html
<button id="tema">Cambiar de tema</button>
```

CSS:

```css
body.oscuro {
  background-color: #14110F;
  color: #F5F0E6;
}

body.oscuro a { color: #F2E94E; }
```

Y antes de cerrar el `</body>`:

```html
<script>
  document.getElementById("tema").onclick = function () {
    document.body.classList.toggle("oscuro");
  };
</script>
```

Tres líneas de JavaScript. El objetivo no es que aprendan JS: es que vean que se enchufa igual que el CSS y que no muerde.

---

## 4 · Menú desplegable en móvil

```html
<button id="abrir">Menú</button>
<nav id="menu">…</nav>
```

```css
@media (max-width: 600px) {
  #menu { display: none; }
  #menu.abierto { display: flex; flex-direction: column; }
}

@media (min-width: 601px) {
  #abrir { display: none; }
}
```

```html
<script>
  document.getElementById("abrir").onclick = function () {
    document.getElementById("menu").classList.toggle("abierto");
  };
</script>
```

Mismo mecanismo que el modo oscuro: `classList.toggle`. Si has hecho el 3, este sale solo.

---

## 5 · Página de error propia

Crea `404.html` en la raíz, con la misma cabecera y pie que el resto. GitHub Pages la usa automáticamente cuando alguien pide una dirección que no existe.

Es un detalle pequeño y les encanta: es el sitio donde se puede hacer una broma.

---

## 6 · Favicon

El iconito de la pestaña. Una imagen cuadrada, mejor de 32×32 o 64×64, guardada como `favicon.png` en la raíz. Y en el `<head>` de cada página:

```html
<link rel="icon" href="favicon.png">
```

Tienes uno de ejemplo en esta carpeta: `favicon.png`.

---

## 7 · Tipografía propia, servida desde tu carpeta

Descarga un archivo `.woff2` de una tipografía con licencia libre y guárdalo en `fuentes/`.

```css
@font-face {
  font-family: "MiLetra";
  src: url("fuentes/miletra.woff2") format("woff2");
}

body { font-family: "MiLetra", Georgia, serif; }
```

Aquí encaja el argumento de fondo del taller, y ahora sí con una demostración delante: la tipografía la sirves tú, desde tu carpeta, y no le pides permiso ni le cuentas a nadie quién visita tu web.

---

## 8 · Sketch de p5.js

Está en `p5-ejemplo/`. Es dibujo hecho con código dentro de una página normal, y conecta directamente con lo que ya hacen.

Llévalo abierto y que cambien los números marcados con ←. Para trastear antes sin instalar nada: el editor de `p5js.org/es`.
