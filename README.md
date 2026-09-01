# Taller de web autogestionada · La Escocesa

Materiales del taller de programación de páginas web autogestionadas: diseñar, programar
y mantener una web propia sin depender de Cargo, Squarespace ni ninguna otra plataforma
de suscripción.

**Publicado en → https://meowrhino.github.io/tallerEscocesa/**

Tres sesiones de tres horas: HTML, CSS y publicación. Cada participante sale del taller
con una web funcionando en internet y sabiendo actualizarla.

---

## Las tres sesiones

| | | |
|---|---|---|
| [`sesion-1.html`](sesion-1.html) | **HTML** | Qué es y por qué estructura en vez de dibujar. Dos páginas propias, enlazadas, con contenido real. Publicación rápida el mismo día. |
| [`sesion-2.html`](sesion-2.html) | **CSS** | Qué es la cascada. Selectores, caja, tipografía, color, composición y móvil. |
| [`sesion-3.html`](sesion-3.html) | **Publicar** | Qué son GitHub, Pages, Cloudflare, un dominio y el DNS. Publicar bien y el ciclo de mantenimiento. |

Cada sesión es **una sola página que funciona de tres maneras**:

- **Diapositivas** — es el modo por defecto. Una lámina por pantalla, se avanza con `←` `→`.
  Pantalla completa con `F`. El nombre de la sesión en la barra despliega el índice de láminas.
- **Documento** — botón `leer`. Todo seguido, con scroll, para leerla en casa.
- **Dossier A4** — botón `imprimir`. Sale maquetado, sin la interfaz.

Dentro de cada sesión, la **teoría** (fondo blanco) y la **práctica** (fondo amarillo) van
marcadas y separadas, con un rótulo en cada lámina, para que en todo momento se sepa si toca
escuchar o toca teclear.

Dentro de cada sesión está **todo**: las explicaciones, los bloques de código con botón
de copiar, los ejercicios, la chuleta y los enlaces al muestrario. No hace falta repartir
nada más.

Cada práctica trae además:

- **Tres capas** — lo que *hay que* hacer para dar el ejercicio por bueno, lo que *puedes*
  hacer si acabas antes, y lo que *podrías* hacer en casa. Con casillas para tachar.
- **Una caja de herramientas** — qué se puede usar en ese momento exacto, separado en
  **esenciales** y **avanzadas**, con enlace al chuletón.

### Atajos

| tecla | |
|---|---|
| `←` `→` | cambiar de lámina |
| `F` | pantalla completa |
| `I` | abrir el índice de láminas (o clicar el nombre de la sesión) |
| `L` | pasar a modo lectura, y volver |
| `T` | claro / oscuro |
| `Esc` | cerrar el índice o salir de pantalla completa |

---

## El chuletón

[`chuleton.html`](chuleton.html) es la referencia para tener abierta en otra pestaña
mientras se trastea, y para llevarse a casa. **75 fichas** organizadas en nueve bloques —
html, reglas y selectores, texto, color, la caja, composición, móvil, efectos y
plantillas—, cada una con:

- qué hace, en una frase
- **todas sus opciones**, listadas (`text-align` es `left · center · right · justify`)
- un ejemplo de código con botón de copiar
- las trampas: qué se rompe y por qué

Lleva **buscador** (busca sin tildes: «movil» encuentra «móvil»), filtro por
**esenciales / avanzadas**, y una sección de **plantillas enteras** para copiar: una página
completa, un `estilo.css` de arranque comentado, un proyecto, una galería en rejilla, un
CV y un menú desplegable sin JavaScript. Se imprime como dossier.

## Qué más hay aquí

```
chuleton.html      la referencia completa: 75 fichas de HTML y CSS, con buscador
muestrario/        26 páginas de ejemplo, cada una en un solo archivo muy comentado
web-base/          punto de partida de la sesión 1, con los huecos comentados
rescate/sesion-1/  cómo queda la web al terminar la primera sesión
rescate/sesion-2/  cómo queda al terminar la segunda, con el CSS completo
cuatro-estilos/    el mismo HTML con cuatro CSS distintos
imprimir/          chuleta, guía y ejercicios, ya maquetados para papel
extra/             recetas sueltas, un sketch de p5.js y un favicon
css/ js/           el estilo y el comportamiento de las presentaciones
```

### Las carpetas de rescate

Son el seguro del taller. Quien falte a una sesión, llegue tarde o se rompa la carpeta,
copia la de rescate correspondiente y sigue desde ahí sin frenar al grupo. Llévalas
también en un pendrive.

### Para imprimir

Abre `imprimir/chuleta.html`, `imprimir/guia.html` o `imprimir/ejercicios.html` y
**Archivo → Imprimir**. Ya llevan el formato de página preparado.

En el diálogo de impresión, activa **«Gráficos de fondo»** o el subrayado no sale.

---

## Ver esto en local

No hace falta nada instalado: abre `index.html` con doble clic.

Si prefieres servirlo (recomendable para que las rutas se comporten igual que publicadas):

```bash
python3 -m http.server 8000
```

Y abre <http://localhost:8000>.

---

## Contenido de ejemplo

Las carpetas de rescate usan una artista inventada, Rita Mestre, y cuatro imágenes de
relleno generadas. **Sustitúyelas** por material real —tuyo o de alguien del grupo que
te dé permiso— antes de dar el taller: funciona mucho mejor.

---

## Créditos y licencia

Taller y materiales de [meowrhino.studio](https://meowrhino.studio) para
[La Escocesa](https://laescocesa.org), 2026.

Los materiales se ceden a las participantes de esta edición para su uso libre.
La reedición del taller con estos materiales se acuerda aparte.

Las guías docentes (guiones minuto a minuto, preguntas frecuentes, soluciones y
evaluación) están en un repositorio privado y no forman parte de este.
