<<<<<<< HEAD
=======
/* ==========================================================
   config.js  ·  
   COMPARTIDO por todo el equipo
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
   p1-portada.js  ·  
   DevelopF-v3
   Menú, tema, contadores, calculadora IMC y extras
   ========================================================== */

// [P1-1] Menú móvil y cambio de tema claro/oscuro
(function () {
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");

  if (burger && menu) {
    // Abre y cierra el menú en celulares
    burger.addEventListener("click", function () {
      var abierto = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", abierto);
    });
    // Al tocar un enlace, el menú se cierra
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Tema claro / oscuro (se recuerda en localStorage)
  var btnTema = document.getElementById("themeBtn");
  var raiz = document.documentElement;
  if (btnTema) {
    btnTema.addEventListener("click", function () {
      var nuevo = raiz.getAttribute("data-theme") === "light" ? "dark" : "light";
      raiz.setAttribute("data-theme", nuevo);
      try { localStorage.setItem("titan-tema", nuevo); } catch (e) {}
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", nuevo === "light" ? "#fbfaf6" : "#0a0a0a");
    });
  }
})();
// [/P1-1]

// [P1-2] Contadores animados de la portada
(function () {
  var numeros = document.querySelectorAll("[data-count]");
  if (!numeros.length || !("IntersectionObserver" in window)) return;

  // Si la persona prefiere menos movimiento, se deja el número final
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  function animar(el) {
    var fin = +el.dataset.count;
    var prefijo = el.dataset.prefix || "";
    var sufijo = el.dataset.suffix || "";
    var duracion = 1600;
    var inicio = null;

    function paso(t) {
      if (inicio === null) inicio = t;
      var p = Math.min((t - inicio) / duracion, 1);
      var suave = 1 - Math.pow(1 - p, 3); // empieza rápido y frena al final
      el.textContent = prefijo + Math.round(fin * suave).toLocaleString("en-US") + sufijo;
      if (p < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  }

  var io = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) { animar(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.6 });

  numeros.forEach(function (n) { io.observe(n); });
})();
// [/P1-2]

// [P1-3] Calculadora de IMC
(function () {
  var form = document.getElementById("imcForm");
  if (!form) return;

  var peso = document.getElementById("imcPeso");
  var alt = document.getElementById("imcAlt");
  var err = document.getElementById("imcErr");
  var out = document.getElementById("imcOut");
  var num = document.getElementById("imcNum");
  var cat = document.getElementById("imcCat");
  var tip = document.getElementById("imcTip");
  var pin = document.getElementById("imcPin");

  // Categorías de la OMS para adultos
  var NIVELES = [
    { max: 18.5, nombre: "Bajo peso",
      tip: "Podemos ayudarte a ganar masa muscular con entrenamiento de fuerza y una buena alimentación. Pide tu evaluación física." },
    { max: 25, nombre: "Peso normal",
      tip: "Vas bien. Mantén tu constancia y trabaja fuerza, resistencia y rendimiento con nuestras clases." },
    { max: 30, nombre: "Sobrepeso",
      tip: "Combinar pesas y cardio funciona muy bien. El Pase Trimestral incluye evaluación física y plan nutricional básico." },
    { max: Infinity, nombre: "Obesidad",
      tip: "Empieza de a poco, con acompañamiento de un entrenador. Si tienes alguna condición de salud, consulta antes con tu médico." }
  ];

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var kg = parseFloat(peso.value);
    var cm = parseFloat(alt.value);

    // Validación de datos razonables
    if (!(kg >= 30 && kg <= 300) || !(cm >= 100 && cm <= 250)) {
      err.textContent = "Revisa los datos: peso entre 30 y 300 kg, estatura entre 100 y 250 cm.";
      out.hidden = true;
      return;
    }
    err.textContent = "";

    var imc = kg / Math.pow(cm / 100, 2); // IMC = peso / estatura² (en metros)
    var nivel = NIVELES.find(function (n) { return imc < n.max; });

    num.textContent = imc.toFixed(1);
    cat.textContent = nivel.nombre;
    tip.textContent = nivel.tip;

    // Posición del indicador en la barra (escala de 15 a 40)
    var pct = Math.min(Math.max((imc - 15) / 25, 0), 1) * 100;
    pin.style.left = "0%";
    out.hidden = false;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { pin.style.left = pct + "%"; });
    });
  });
})();
// [/P1-3]

// [P1-4] Barra de progreso, botón volver arriba, animación al scroll y menú activo
(function () {
  // --- Barra de progreso y botón "volver arriba" ---
  var barra = document.getElementById("progress");
  var subir = document.getElementById("backtop");
  var esperando = false;

  function actualizar() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var y = window.pageYOffset;
    if (barra) barra.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    if (subir) subir.classList.toggle("show", y > 600);
    esperando = false;
  }
  window.addEventListener("scroll", function () {
    if (!esperando) { esperando = true; requestAnimationFrame(actualizar); }
  }, { passive: true });
  actualizar();

  if (subir) {
    subir.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();

(function () {
  // --- Animación de aparición (clase .rv) ---
  var items = document.querySelectorAll(".rv");

  function mostrar(el) {
    el.classList.add("in");
    // Cuando termina la animación se quita .rv, así no estorba a los efectos hover
    setTimeout(function () {
      el.classList.remove("rv", "in");
      el.style.removeProperty("--d");
    }, 1400);
  }

  if (!("IntersectionObserver" in window)) { items.forEach(mostrar); return; }

  var io = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) { mostrar(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });

  items.forEach(function (el) {
    // Retraso escalonado según la posición entre sus hermanos
    var pos = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.setProperty("--d", (pos % 4) * 0.12 + "s");
    io.observe(el);
  });
})();

(function () {
  // --- Resalta en el menú la sección que se está viendo ---
  if (!("IntersectionObserver" in window)) return;
  var enlaces = {};
  document.querySelectorAll('#menu a[href^="#"]:not(.btn)').forEach(function (a) {
    enlaces[a.getAttribute("href").slice(1)] = a;
  });

  var io = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      var a = enlaces[e.target.id];
      if (!a || !e.isIntersecting) return;
      Object.keys(enlaces).forEach(function (k) { enlaces[k].classList.remove("active"); });
      a.classList.add("active");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  Object.keys(enlaces).forEach(function (id) {
    var seccion = document.getElementById(id);
    if (seccion) io.observe(seccion);
  });
})();
// [/P1-4]

/* ==========================================================
   p2-contenido.js  ·  
   DevelopF-V3
   Horario de clases (pestañas) y ventana de inscripción a planes
   (Nosotros y Entrenadores no necesitan JavaScript: son HTML + CSS)
   ========================================================== */

// [P2-3] Horario de clases por día
(function () {
  var tabs = document.getElementById("diasTabs");
  var panel = document.getElementById("clasesPanel");
  if (!tabs || !panel) return;

  // Número de día: 0 = domingo, 1 = lunes ... 6 = sábado (igual que Date.getDay())
  var NOMBRES = { 0: "Domingo", 1: "Lunes", 2: "Martes", 3: "Miércoles", 4: "Jueves", 5: "Viernes", 6: "Sábado" };

  // [hora, clase, nivel, instructor]  ← datos de ejemplo, cámbialos por los reales
  var HORARIO = {
    1: [["6:30 a.m.", "Funcional", "Todos los niveles", "María V."],
        ["6:00 p.m.", "Spinning", "Intermedio", "Lucía R."],
        ["7:30 p.m.", "Boxeo", "Todos los niveles", "Diego A."]],
    2: [["7:00 a.m.", "Zumba", "Todos los niveles", "Lucía R."],
        ["6:00 p.m.", "Funcional", "Intermedio", "María V."],
        ["7:30 p.m.", "Spinning", "Avanzado", "Lucía R."]],
    3: [["6:30 a.m.", "Boxeo", "Todos los niveles", "Diego A."],
        ["6:00 p.m.", "Zumba", "Todos los niveles", "Lucía R."],
        ["7:30 p.m.", "Funcional", "Avanzado", "Carlos Q."]],
    4: [["7:00 a.m.", "Spinning", "Intermedio", "Lucía R."],
        ["6:00 p.m.", "Boxeo", "Intermedio", "Diego A."],
        ["7:30 p.m.", "Funcional", "Todos los niveles", "María V."]],
    5: [["6:30 a.m.", "Funcional", "Todos los niveles", "María V."],
        ["6:00 p.m.", "Zumba", "Todos los niveles", "Lucía R."],
        ["7:30 p.m.", "Boxeo", "Avanzado", "Diego A."]],
    6: [["8:00 a.m.", "Spinning", "Todos los niveles", "Lucía R."],
        ["9:30 a.m.", "Funcional", "Intermedio", "Carlos Q."],
        ["11:00 a.m.", "Zumba", "Todos los niveles", "Lucía R."],
        ["5:00 p.m.", "Boxeo", "Todos los niveles", "Diego A."]],
    0: [["9:00 a.m.", "Funcional", "Todos los niveles", "María V."],
        ["10:30 a.m.", "Zumba", "Todos los niveles", "Lucía R."]]
  };

  // Crea un elemento con clase y texto (textContent es seguro, no interpreta HTML)
  function el(tag, clase, texto) {
    var e = document.createElement(tag);
    if (clase) e.className = clase;
    if (texto) e.textContent = texto;
    return e;
  }

  function mostrar(dia) {
    // Marca la pestaña activa
    tabs.querySelectorAll(".tab").forEach(function (b) {
      var activa = +b.dataset.dia === dia;
      b.setAttribute("aria-selected", activa);
      b.tabIndex = activa ? 0 : -1;
    });

    // Dibuja las clases del día
    panel.textContent = "";
    panel.setAttribute("aria-label", "Clases del " + NOMBRES[dia].toLowerCase());
    (HORARIO[dia] || []).forEach(function (c) {
      var fila = el("div", "clase");
      var info = el("div");
      info.appendChild(el("h3", "", c[1]));
      info.appendChild(el("p", "", "Con " + c[3]));
      fila.appendChild(el("span", "clase-hora", c[0]));
      fila.appendChild(info);
      fila.appendChild(el("span", "nivel", c[2]));
      panel.appendChild(fila);
    });
  }

  var botones = Array.prototype.slice.call(tabs.querySelectorAll(".tab"));

  tabs.addEventListener("click", function (e) {
    var b = e.target.closest(".tab");
    if (b) mostrar(+b.dataset.dia);
  });

  // Navegación con flechas del teclado
  tabs.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    var i = botones.indexOf(document.activeElement);
    if (i < 0) return;
    i = (i + (e.key === "ArrowRight" ? 1 : -1) + botones.length) % botones.length;
    botones[i].focus();
    mostrar(+botones[i].dataset.dia);
  });

  mostrar(new Date().getDay()); // abre el día de hoy
})();
// [/P2-3]

// [P2-4] Ventana para elegir un plan y enviarlo por WhatsApp
(function () {
  var botones = document.querySelectorAll("[data-plan]");
  var dlg = document.getElementById("planDialog");
  var form = document.getElementById("planForm");
  var nombrePlan = document.getElementById("planNombre");
  var cliente = document.getElementById("planCliente");
  var cancelar = document.getElementById("planCancelar");
  var elegido = "";

  function enviar(nombre) {
    var msg = "Hola, quiero información sobre el plan " + elegido + " del gimnasio" +
              (nombre ? ". Mi nombre es " + nombre : "");
    window.open(TITAN.wa(msg), "_blank", "noopener");
  }

  botones.forEach(function (b) {
    b.addEventListener("click", function () {
      elegido = b.dataset.plan;
      if (dlg && typeof dlg.showModal === "function") {
        nombrePlan.textContent = elegido;
        dlg.showModal();
        cliente.focus();
      } else {
        enviar(""); // navegador antiguo sin <dialog>: manda el mensaje directo
      }
    });
  });

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      enviar(cliente.value.trim());
      dlg.close();
      form.reset();
    });
  }
  if (cancelar) cancelar.addEventListener("click", function () { dlg.close(); });

  // Clic fuera de la ventana = cerrar
  if (dlg) {
    dlg.addEventListener("click", function (e) {
      if (e.target !== dlg) return;
      var r = dlg.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dlg.close();
    });
  }
})();
// [/P2-4]
/* ==========================================================
   p3-comunidad.js  ·  
   DevelopF-V4
   FAQ, reserva de clase de prueba, "abierto ahora" y footer
   ========================================================== */

// [P3-1] Preguntas frecuentes: solo una abierta a la vez
(function () {
  var items = document.querySelectorAll(".faq details");
  items.forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (!d.open) return;
      items.forEach(function (otro) { if (otro !== d) otro.open = false; });
    });
  });
})();
// [/P3-1]

// [P3-2] Reserva de clase de prueba por WhatsApp
(function () {
  var form = document.getElementById("reservaForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nombre = document.getElementById("rNombre").value.trim();
    var clase = document.getElementById("rClase").value;
    var dia = document.getElementById("rDia").value;
    var objetivo = document.getElementById("rObj").value;
    if (!nombre) return;

    var cuando = dia === "Cualquier día" ? "cualquier día" : "el " + dia.toLowerCase();
    var msg = "Hola, soy " + nombre + ". Quiero reservar una clase de prueba de " + clase +
              " para " + cuando + ". Mi objetivo es " + objetivo.toLowerCase() + ".";
    window.open(TITAN.wa(msg), "_blank", "noopener");
  });
})();
// [/P3-2]

// [P3-3] Estado "abierto ahora" según la hora de Perú
(function () {
  var estado = document.getElementById("abierto");
  var filas = document.querySelectorAll(".hours tr[data-days]");
  if (!estado) return;

  // Horario en minutos desde la medianoche: [abre, cierra]   (0 = domingo ... 6 = sábado)
  var H = {
    0: [8 * 60, 13 * 60],
    1: [6 * 60, 22 * 60], 2: [6 * 60, 22 * 60], 3: [6 * 60, 22 * 60],
    4: [6 * 60, 22 * 60], 5: [6 * 60, 22 * 60],
    6: [7 * 60, 20 * 60]
  };
  var DIAS_EN = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  // Hora actual en Lima, sin importar dónde esté la persona que visita la web
  function ahoraLima() {
    var d = {};
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Lima", weekday: "short",
      hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    }).formatToParts(new Date()).forEach(function (p) { d[p.type] = p.value; });
    return { dia: DIAS_EN[d.weekday], min: (+d.hour % 24) * 60 + (+d.minute) };
  }

  // 390 -> "6:30 a.m."
  function formato(m) {
    var h = Math.floor(m / 60), mi = m % 60;
    return (h % 12 || 12) + ":" + (mi < 10 ? "0" : "") + mi + " " + (h >= 12 ? "p.m." : "a.m.");
  }

  function actualizar() {
    var a = ahoraLima();
    var hoy = H[a.dia];
    var abierto = a.min >= hoy[0] && a.min < hoy[1];

    estado.className = "status " + (abierto ? "open" : "closed");
    if (abierto) {
      estado.textContent = "Abierto ahora · cierra a las " + formato(hoy[1]);
    } else if (a.min < hoy[0]) {
      estado.textContent = "Cerrado ahora · abre hoy a las " + formato(hoy[0]);
    } else {
      estado.textContent = "Cerrado ahora · abre mañana a las " + formato(H[(a.dia + 1) % 7][0]);
    }

    // Resalta la fila del día de hoy en la tabla
    filas.forEach(function (tr) {
      var dias = tr.dataset.days.split(",");
      tr.classList.toggle("today", dias.indexOf(String(a.dia)) > -1);
    });
  }

  actualizar();
  setInterval(actualizar, 60000); // se refresca cada minuto
})();
// [/P3-3]

// [P3-4] Botón flotante de WhatsApp y año del footer
(function () {
  var wa = document.getElementById("waFloat");
  if (wa) wa.href = TITAN.wa("Hola, quiero información sobre las membresías del gimnasio");

  var anio = document.getElementById("year");
  if (anio) anio.textContent = new Date().getFullYear();
})();
// [/P3-4]

>>>>>>> Integracion-V3
