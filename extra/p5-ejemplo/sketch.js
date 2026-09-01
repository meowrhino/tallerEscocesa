// ══════════════════════════════════════════════════════════
//  Un sketch de p5.js mínimo, para tocarlo sin miedo.
//
//  Los números que están para cambiar llevan una flecha ←
//  Cambia uno, guarda, recarga. No se puede romper nada.
// ══════════════════════════════════════════════════════════

let colorFondo = "#FBFAF7";   // ← el fondo
let colorTrazo = "#12233A";   // ← el trazo
let grosor = 2;               // ← lo gordo que es el trazo
let separacion = 26;          // ← cada cuántos píxeles se dibuja

// setup() se ejecuta UNA vez, al empezar.
function setup() {
  let lienzo = createCanvas(640, 420);
  lienzo.parent("lienzo");     // lo mete dentro del div del HTML
  background(colorFondo);
  strokeWeight(grosor);
  stroke(colorTrazo);
  noFill();
}

// draw() se ejecuta CONTINUAMENTE, unas 60 veces por segundo.
function draw() {
  // La distancia del ratón al centro decide el tamaño.
  let d = dist(mouseX, mouseY, width / 2, height / 2);
  let tam = map(d, 0, width, separacion, 4);

  // Solo dibuja si el ratón está dentro del lienzo.
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    ellipse(mouseX, mouseY, tam, tam);
  }
}

// Al hacer clic, se limpia.
function mousePressed() {
  background(colorFondo);
}

// ── Cosas para probar ────────────────────────────────────
//
//  · Cambia ellipse(...) por rect(...) o por line(mouseX, mouseY, width/2, height/2)
//  · Pon colorTrazo en "#D8402F"
//  · Sube grosor a 8
//  · Quita el background(colorFondo) del setup y mira qué pasa
//
// ─────────────────────────────────────────────────────────
