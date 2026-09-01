/* taller de web autogestionada · la escocesa
   dos modos: documento (leer) y diapositiva (proyectar)
   teclas: P proyectar · ← → cambiar lámina · T tema · esc salir  */

(function () {
  'use strict';

  var cuerpo = document.body;
  var raiz = document.documentElement;

  /* ── tema ─────────────────────────────────────────── */
  try {
    var guardado = localStorage.getItem('taller-tema');
    if (guardado) raiz.setAttribute('data-tema', guardado);
  } catch (e) {}

  function cambiarTema() {
    var oscuroAhora = getComputedStyle(cuerpo).backgroundColor;
    var esOscuro = /^rgb\((\d+)/.test(oscuroAhora) && parseInt(RegExp.$1, 10) < 128;
    var nuevo = esOscuro ? 'claro' : 'oscuro';
    raiz.setAttribute('data-tema', nuevo);
    try { localStorage.setItem('taller-tema', nuevo); } catch (e) {}
  }

  /* ── láminas ──────────────────────────────────────── */
  var laminas = [].slice.call(document.querySelectorAll('.lamina, .portada'));
  var contenedor = document.querySelector('main');

  function visibles() {
    return laminas.filter(function (l) { return l.offsetParent !== null; });
  }

  function indiceActual() {
    var lista = visibles();
    var caja = modoDiapo() ? contenedor : window;
    var y = modoDiapo() ? contenedor.scrollTop : window.scrollY;
    var mejor = 0, minDist = Infinity;
    lista.forEach(function (l, i) {
      var top = modoDiapo() ? l.offsetTop : l.offsetTop;
      var d = Math.abs(top - y - 4);
      if (d < minDist) { minDist = d; mejor = i; }
    });
    return { i: mejor, lista: lista };
  }

  function irA(n) {
    var est = indiceActual();
    var destino = Math.max(0, Math.min(est.lista.length - 1, n));
    var el = est.lista[destino];
    if (!el) return;
    if (modoDiapo()) contenedor.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    pintarContador(destino, est.lista.length);
  }

  function mover(paso) {
    var est = indiceActual();
    irA(est.i + paso);
  }

  /* ── modo diapositiva ─────────────────────────────── */
  function modoDiapo() { return cuerpo.classList.contains('diapositivas'); }

  function alternarDiapo(forzar) {
    var activar = typeof forzar === 'boolean' ? forzar : !modoDiapo();
    cuerpo.classList.toggle('diapositivas', activar);
    var b = document.getElementById('btn-proyectar');
    if (b) b.textContent = activar ? 'salir de proyección' : 'proyectar';
    if (activar) {
      contenedor.scrollTop = 0;
      pintarContador(0, visibles().length);
    }
  }

  function pintarContador(i, total) {
    var c = document.querySelector('.contador');
    if (c) c.textContent = (i + 1) + ' / ' + total;
  }

  /* ── barra de progreso (modo documento) ───────────── */
  var barra = document.querySelector('.progreso');
  function pintarProgreso() {
    if (!barra || modoDiapo()) return;
    var alto = document.documentElement.scrollHeight - window.innerHeight;
    barra.style.width = alto > 0 ? (window.scrollY / alto * 100) + '%' : '0%';
  }
  window.addEventListener('scroll', pintarProgreso, { passive: true });
  pintarProgreso();

  if (contenedor) {
    contenedor.addEventListener('scroll', function () {
      if (!modoDiapo()) return;
      var est = indiceActual();
      pintarContador(est.i, est.lista.length);
    }, { passive: true });
  }

  /* ── teclado ──────────────────────────────────────── */
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target.tagName;
    if (t === 'INPUT' || t === 'TEXTAREA') return;

    switch (e.key) {
      case 'ArrowRight': case 'PageDown':
        if (modoDiapo()) { e.preventDefault(); mover(1); } break;
      case 'ArrowLeft': case 'PageUp':
        if (modoDiapo()) { e.preventDefault(); mover(-1); } break;
      case ' ':
        if (modoDiapo()) { e.preventDefault(); mover(e.shiftKey ? -1 : 1); } break;
      case 'Home':
        if (modoDiapo()) { e.preventDefault(); irA(0); } break;
      case 'End':
        if (modoDiapo()) { e.preventDefault(); irA(visibles().length - 1); } break;
      case 'p': case 'P':
        e.preventDefault(); alternarDiapo(); break;
      case 't': case 'T':
        e.preventDefault(); cambiarTema(); break;
      case 'Escape':
        if (modoDiapo()) { e.preventDefault(); alternarDiapo(false); } break;
      case 'f': case 'F':
        e.preventDefault();
        if (!document.fullscreenElement) {
          if (raiz.requestFullscreen) raiz.requestFullscreen().catch(function () {});
          alternarDiapo(true);
        } else if (document.exitFullscreen) { document.exitFullscreen(); }
        break;
    }
  });

  /* ── botones de la barra ──────────────────────────── */
  var bp = document.getElementById('btn-proyectar');
  if (bp) bp.addEventListener('click', function () { alternarDiapo(); });

  var bt = document.getElementById('btn-tema');
  if (bt) bt.addEventListener('click', cambiarTema);

  var bi = document.getElementById('btn-imprimir');
  if (bi) bi.addEventListener('click', function () {
    alternarDiapo(false);
    window.print();
  });

  /* ── botón copiar en cada bloque de código ────────── */
  document.querySelectorAll('.codigo').forEach(function (caja) {
    var pre = caja.querySelector('pre');
    if (!pre) return;
    var b = document.createElement('button');
    b.className = 'copiar';
    b.type = 'button';
    b.textContent = 'copiar';
    b.addEventListener('click', function () {
      var txt = pre.innerText;
      var ok = function () {
        b.textContent = 'copiado';
        setTimeout(function () { b.textContent = 'copiar'; }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(ok, function () { b.textContent = 'no se pudo'; });
      } else {
        var ta = document.createElement('textarea');
        ta.value = txt; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); ok(); } catch (err) { b.textContent = 'no se pudo'; }
        document.body.removeChild(ta);
      }
    });
    caja.appendChild(b);
  });

  /* ── contador ─────────────────────────────────────── */
  if (!document.querySelector('.contador')) {
    var c = document.createElement('div');
    c.className = 'contador';
    document.body.appendChild(c);
  }
})();
