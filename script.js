/* ==========================================================
   config.js  ·  COMPARTIDO por todo el equipo
   Viene en el primer commit (esqueleto). Nadie lo modifica
   salvo para cambiar el número de WhatsApp.
   ========================================================== */
window.TITAN = (function () {
  var numero = "51926498836"; // número con código de país, sin + ni espacios

  return {
    numero: numero,
    // Devuelve el enlace de WhatsApp con el mensaje ya escrito
    wa: function (mensaje) {
      return "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensaje);
    }
  };
})();
/* ==========================================================
   p1-portada.js  ·  PERSONA 1
   Menú, tema, contadores, calculadora IMC y extras
   ========================================================== */

// [P1-1] Menú móvil y cambio de tema claro/oscuro
// pega aquí el contenido de P1-1
// [/P1-1]

// [P1-2] Contadores animados de la portada
// pega aquí el contenido de P1-2
// [/P1-2]

// [P1-3] Calculadora de IMC
// pega aquí el contenido de P1-3
// [/P1-3]

// [P1-4] Barra de progreso, botón volver arriba, animación al scroll y menú activo
// pega aquí el contenido de P1-4
// [/P1-4]
/* ==========================================================
   p2-contenido.js  ·  PERSONA 2
   Horario de clases (pestañas) y ventana de inscripción a planes
   (Nosotros y Entrenadores no necesitan JavaScript: son HTML + CSS)
   ========================================================== */

// [P2-3] Horario de clases por día
// pega aquí el contenido de P2-3
// [/P2-3]

// [P2-4] Ventana para elegir un plan y enviarlo por WhatsApp
// pega aquí el contenido de P2-4
// [/P2-4]
/* ==========================================================
   p3-comunidad.js  ·  PERSONA 3
   FAQ, reserva de clase de prueba, "abierto ahora" y footer
   ========================================================== */

// [P3-1] Preguntas frecuentes: solo una abierta a la vez
// pega aquí el contenido de P3-1
// [/P3-1]

// [P3-2] Reserva de clase de prueba por WhatsApp
// pega aquí el contenido de P3-2
// [/P3-2]

// [P3-3] Estado "abierto ahora" según la hora de Perú
// pega aquí el contenido de P3-3
// [/P3-3]

// [P3-4] Botón flotante de WhatsApp y año del footer
// pega aquí el contenido de P3-4
// [/P3-4]
