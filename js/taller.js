/* taller de web autogestionada · la escocesa
   Diapositivas por defecto. Flechas para avanzar.
   El nombre de la sesión abierta despliega el índice de láminas.  */

(function () {
  'use strict';

  var cuerpo = document.body;
  var raiz = document.documentElement;
  var caja = document.querySelector('main');
  if (!caja) return;

  var laminas = [].slice.call(caja.querySelectorAll('.lamina, .portada'));

  /* ── tema ──────────────────────────────────────────────── */
  try {
    var t = localStorage.getItem('taller-tema');
    if (t) raiz.setAttribute('data-tema', t);
  } catch (e) {}

  function esOscuro() {
    var c = getComputedStyle(cuerpo).backgroundColor;
    var m = c.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    return m ? (+m[1] + +m[2] + +m[3]) / 3 < 128 : false;
  }
  function cambiarTema() {
    var nuevo = esOscuro() ? 'claro' : 'oscuro';
    raiz.setAttribute('data-tema', nuevo);
    try { localStorage.setItem('taller-tema', nuevo); } catch (e) {}
  }

  /* ── modo leer ─────────────────────────────────────────── */
  function modoLeer() { return cuerpo.classList.contains('leer'); }

  function alternarLeer(forzar) {
    var activar = typeof forzar === 'boolean' ? forzar : !modoLeer();
    var actual = indiceActual();
    cuerpo.classList.toggle('leer', activar);
    var b = document.getElementById('btn-leer');
    if (b) b.textContent = activar ? 'diapositivas' : 'leer';
    // conservar la posición al cambiar de modo
    requestAnimationFrame(function () { irA(actual, true); });
  }

  /* ── navegación ────────────────────────────────────────── */
  function posicion() { return window.scrollY || document.documentElement.scrollTop; }

  /* Distancia de cada lámina al inicio del área que hace scroll.
     Con getBoundingClientRect no importa quién sea el offsetParent. */
  function desplazamientoDe(el) {
    return el.getBoundingClientRect().top + posicion() - (modoLeer() ? barraAlto() : 0);
  }

  function barraAlto() {
    var b = document.querySelector('.barra');
    return b ? b.getBoundingClientRect().height : 0;
  }

  function indiceActual() {
    var y = posicion();
    var mejor = 0, min = Infinity;
    for (var i = 0; i < laminas.length; i++) {
      var d = Math.abs(desplazamientoDe(laminas[i]) - y);
      if (d < min) { min = d; mejor = i; }
    }
    return mejor;
  }

  function irA(n, instantaneo) {
    n = Math.max(0, Math.min(laminas.length - 1, n));
    var el = laminas[n];
    if (!el) return;
    var destino = Math.max(0, Math.round(desplazamientoDe(el)));
    /* En diapositivas el salto es seco, como en cualquier presentación.
       Además el scroll suave no sobrevive a scroll-snap obligatorio. */
    window.scrollTo({
      top: destino,
      behavior: (instantaneo || !modoLeer()) ? 'instant' : 'smooth'
    });
    pintar(n);
  }

  function mover(paso) { irA(indiceActual() + paso); }

  /* ── contador ──────────────────────────────────────────── */
  var contador = document.createElement('div');
  contador.className = 'contador';
  cuerpo.appendChild(contador);

  function pintar(n) {
    if (n === undefined) n = indiceActual();
    contador.textContent = (n + 1) + ' / ' + laminas.length;
    var botones = panel ? panel.querySelectorAll('button') : [];
    for (var i = 0; i < botones.length; i++) {
      if (i === n) botones[i].setAttribute('aria-current', 'true');
      else botones[i].removeAttribute('aria-current');
    }
  }

  window.addEventListener('scroll', function () { pintar(); }, { passive: true });

  /* ── índice desplegable ────────────────────────────────── */
  var panel = null;

  function rotulo(l) {
    if (l.dataset.rotulo) return l.dataset.rotulo;
    var h = l.querySelector('h1, h2');
    if (h) {
      var c = h.cloneNode(true);
      c.querySelectorAll('br').forEach(function (b) { b.replaceWith(' '); });
      return c.textContent.replace(/\s+/g, ' ').trim();
    }
    var p = l.querySelector('p');
    return p ? p.textContent.replace(/\s+/g, ' ').trim().slice(0, 48) : 'lámina';
  }

  function tipoDe(l) {
    var d = l.getAttribute('data-tipo') || '';
    if (d === 'practica') return 'práctica';
    if (d === 'teoria') return 'teoría';
    if (d === 'pausa') return 'pausa';
    return '';
  }

  function construirIndice() {
    panel = document.createElement('div');
    panel.className = 'indice';
    panel.id = 'indice-laminas';
    var ol = document.createElement('ol');
    laminas.forEach(function (l, i) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      var tp = tipoDe(l);
      b.innerHTML = '<span class="n">' + String(i + 1).padStart(2, '0') + '</span>' +
                    '<span class="tipo" data-t="' + tp + '">' + tp + '</span>' +
                    '<span class="rot"></span>';
      b.querySelector('.rot').textContent = rotulo(l);
      b.addEventListener('click', function () { cerrarIndice(); irA(i); });
      li.appendChild(b);
      ol.appendChild(li);
    });
    panel.appendChild(ol);
    cuerpo.appendChild(panel);
  }

  function abrirIndice() {
    panel.classList.add('abierto');
    if (disparador) disparador.setAttribute('aria-expanded', 'true');
    pintar();
  }
  function cerrarIndice() {
    panel.classList.remove('abierto');
    if (disparador) disparador.setAttribute('aria-expanded', 'false');
  }
  function alternarIndice() {
    panel.classList.contains('abierto') ? cerrarIndice() : abrirIndice();
  }

  var disparador = document.querySelector('.barra a[aria-current]');
  if (laminas.length) {
    construirIndice();
    if (disparador) {
      disparador.classList.add('actual');
      disparador.setAttribute('aria-haspopup', 'true');
      disparador.setAttribute('aria-expanded', 'false');
      disparador.setAttribute('aria-controls', 'indice-laminas');
      disparador.addEventListener('click', function (e) { e.preventDefault(); alternarIndice(); });
    }
    document.addEventListener('click', function (e) {
      if (!panel.classList.contains('abierto')) return;
      if (panel.contains(e.target) || (disparador && disparador.contains(e.target))) return;
      cerrarIndice();
    });
  }

  /* ── teclado ───────────────────────────────────────────── */
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var n = e.target.tagName;
    if (n === 'INPUT' || n === 'TEXTAREA') return;

    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown':
        e.preventDefault(); mover(1); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
        e.preventDefault(); mover(-1); break;
      case ' ':
        e.preventDefault(); mover(e.shiftKey ? -1 : 1); break;
      case 'Home': e.preventDefault(); irA(0); break;
      case 'End':  e.preventDefault(); irA(laminas.length - 1); break;
      case 'l': case 'L': e.preventDefault(); alternarLeer(); break;
      case 't': case 'T': e.preventDefault(); cambiarTema(); break;
      case 'i': case 'I': e.preventDefault(); alternarIndice(); break;
      case 'Escape':
        if (panel && panel.classList.contains('abierto')) { e.preventDefault(); cerrarIndice(); }
        else if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen();
        break;
      case 'f': case 'F':
        e.preventDefault();
        if (!document.fullscreenElement) {
          if (raiz.requestFullscreen) raiz.requestFullscreen().catch(function () {});
          alternarLeer(false);
        } else if (document.exitFullscreen) document.exitFullscreen();
        break;
    }
  });

  /* ── botones ───────────────────────────────────────────── */
  var bl = document.getElementById('btn-leer');
  if (bl) bl.addEventListener('click', function () { alternarLeer(); });

  var bt = document.getElementById('btn-tema');
  if (bt) bt.addEventListener('click', cambiarTema);

  var bi = document.getElementById('btn-imprimir');
  if (bi) bi.addEventListener('click', function () { cerrarIndice(); window.print(); });

  /* ── copiar código ─────────────────────────────────────── */
  document.querySelectorAll('.codigo').forEach(function (c) {
    var pre = c.querySelector('pre');
    if (!pre) return;
    var b = document.createElement('button');
    b.className = 'copiar'; b.type = 'button'; b.textContent = 'copiar';
    b.addEventListener('click', function () {
      var ok = function () {
        b.textContent = 'copiado';
        setTimeout(function () { b.textContent = 'copiar'; }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(pre.innerText).then(ok, function () { b.textContent = 'no se pudo'; });
      } else {
        var ta = document.createElement('textarea');
        ta.value = pre.innerText; cuerpo.appendChild(ta); ta.select();
        try { document.execCommand('copy'); ok(); } catch (err) { b.textContent = 'no se pudo'; }
        cuerpo.removeChild(ta);
      }
    });
    c.appendChild(b);
  });

  /* ── marca de teoría / práctica en cada lámina ─────────── */
  laminas.forEach(function (l) {
    var tp = tipoDe(l);
    if (!tp || l.querySelector('.marca-tipo') || l.classList.contains('bloque')) return;
    var s = document.createElement('span');
    s.className = 'marca-tipo';
    s.textContent = tp;
    l.appendChild(s);
  });

  /* si se entra con un ancla, colocarse ahí */
  if (location.hash) {
    var destino = document.querySelector(location.hash);
    if (destino) {
      var i = laminas.indexOf(destino.closest('.lamina, .portada') || destino);
      if (i >= 0) requestAnimationFrame(function () { irA(i, true); });
    }
  }
  pintar(0);
})();
