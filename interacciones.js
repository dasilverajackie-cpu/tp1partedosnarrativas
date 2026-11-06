
const nodos = document.querySelectorAll(".node");
const enlaces = document.querySelectorAll("[data-node]");

enlaces.forEach((enlace) => {
  enlace.addEventListener("click", (event) => {
    event.preventDefault();

    const destino = enlace.dataset.node;

    nodos.forEach((nodo) => {
      nodo.classList.remove("active");
    });

    const nodoDestino = document.getElementById(destino);

    if (nodoDestino) {
      nodoDestino.classList.add("active");
      window.scrollTo(0, 0);
    }
  });
});

/* MAPA DE RECORRIDO AUTOMATICO */

document.addEventListener("DOMContentLoaded", function () {

    const archivo = window.location.pathname.split("/").pop();

    let nodoActual = archivo.replace(".html", "");

    if (nodoActual === "index") {
        nodoActual = "INICIO";
    }

    const colores = {
        "INICIO": "#FFFFFF",
        "nodo21": "#D62839",
        "nodo22": "#2786D1",
        "nodo23": "#2E9D59",
        "nodo31": "#D62839",
        "nodo32": "#2786D1",
        "nodo33": "#2E9D59",
        "nodo41": "#D62839",
        "nodo43": "#2786D1",
        "nodo44": "#2E9D59",
        "nodo51": "#D62839",
        "nodo52": "#2786D1",
        "nodo53": "#2E9D59"
    };

    let recorrido = JSON.parse(
        sessionStorage.getItem("recorridoAvengers")
    ) || [];

    if (!recorrido.includes(nodoActual)) {
        recorrido.push(nodoActual);
    }

    sessionStorage.setItem(
        "recorridoAvengers",
        JSON.stringify(recorrido)
    );

    const mapa = document.querySelector(".mapa-recorrido");

    if (mapa) {

        mapa.innerHTML = "";

        const titulo = document.createElement("p");
        titulo.className = "mapa-titulo";
        titulo.textContent = "TU RECORRIDO";

        mapa.appendChild(titulo);

        const pasos = document.createElement("div");
        pasos.className = "mapa-pasos";

        recorrido.forEach(function (nodo, indice) {

            const paso = document.createElement("span");

            paso.className = "paso visitado";
            paso.textContent = nodo === "INICIO" ? "INICIO" : nodo.replace("nodo", "");

            paso.style.backgroundColor = colores[nodo] || "#777";
            paso.style.color = "#FFFFFF";

            if (nodo === nodoActual) {
                paso.classList.add("actual");
            }

            pasos.appendChild(paso);

            if (indice < recorrido.length - 1) {
                const conector = document.createElement("span");

                conector.className = "conector";
                conector.style.backgroundColor = colores[nodo] || "#777";

                pasos.appendChild(conector);
            }

        });

        mapa.appendChild(pasos);
    }

});

/* MASCARA AL HACER CLICK */

document.addEventListener("click", function (evento) {

    const mascara = document.createElement("div");

    mascara.classList.add("mascara-click");

    mascara.style.left = evento.clientX + "px";
    mascara.style.top = evento.clientY + "px";

    document.body.appendChild(mascara);

    setTimeout(function () {
        mascara.remove();
    }, 500);

});

/* PANEL J.A.R.V.I.S. */

document.addEventListener("DOMContentLoaded", function () {

    const archivo = window.location.pathname.split("/").pop();
    const nodo = archivo.replace(".html", "").replace("index", "INICIO");

    const panel = document.createElement("aside");
    panel.id = "jarvis-panel";

    panel.innerHTML = `
        <div class="jarvis-header">
            <h2>J.A.R.V.I.S.</h2>
            <span class="jarvis-status">SYSTEM ONLINE</span>
        </div>

        <div class="jarvis-line"></div>

        <section class="jarvis-section">
            <h3>INFINITY STONES SCAN</h3>

            <div class="jarvis-gemas">
                <span class="gema-indicador roja">●</span>
                <span class="gema-indicador azul">●</span>
                <span class="gema-indicador verde">●</span>
                <span class="gema-indicador amarilla">●</span>
                <span class="gema-indicador violeta">●</span>
                <span class="gema-indicador naranja">●</span>
            </div>

            <p>GEMAS LOCALIZADAS: <span id="jarvis-gemas">0 / 6</span></p>
        </section>

        <div class="jarvis-line"></div>

        <section class="jarvis-section">
            <h3>NAVEGACIÓN</h3>
            <p>RUTA ACTIVA: <span id="jarvis-ruta">01</span></p>
            <p>NODO ACTUAL: <span id="jarvis-nodo">${nodo}</span></p>
            <p>NODOS VISITADOS: <span id="jarvis-visitados">1</span></p>
        </section>

        <div class="jarvis-line"></div>

        <div class="jarvis-footer">
            <span class="jarvis-pulso">●</span>
            SISTEMA DE RASTREO ACTIVO
        </div>
    `;

    document.body.appendChild(panel);

});

/* =================================
   BUSQUEDA DE LAS GEMAS DEL INFINITO
================================= */

document.addEventListener("DOMContentLoaded", function () {

    const gemas = {
        nodo21: { id: "gema-realidad", color: "roja", simbolo: "◆" },
        nodo32: { id: "gema-espacio", color: "azul", simbolo: "◆" },
        nodo33: { id: "gema-tiempo", color: "verde", simbolo: "◆" },
        nodo41: { id: "gema-mente", color: "amarilla", simbolo: "◆" },
        nodo43: { id: "gema-poder", color: "violeta", simbolo: "◆" },
        nodo44: { id: "gema-alma", color: "naranja", simbolo: "◆" }
    };

    const archivo = window.location.pathname.split("/").pop();
    const nodoActual = archivo.replace(".html", "");

    const gemaActual = gemas[nodoActual];

    const almacenamiento = "gemasAvengersEncontradas";

    let encontradas = JSON.parse(
        localStorage.getItem(almacenamiento)
    ) || [];

    /* ACTUALIZAR PANEL J.A.R.V.I.S. */

    function actualizarJarvis() {

        const contador = document.getElementById("jarvis-gemas");

        if (contador) {
            contador.textContent = encontradas.length + " / 6";
        }

        const colores = ["roja", "azul", "verde", "amarilla", "violeta", "naranja"];

        colores.forEach(function (color) {

            const indicador = document.querySelector(
                ".gema-indicador." + color
            );

            if (!indicador) return;

            const gemaEncontrada = Object.values(gemas).find(function (gema) {
                return gema.color === color && encontradas.includes(gema.id);
            });

            if (gemaEncontrada) {
                indicador.style.opacity = "1";
                indicador.style.textShadow = "0 0 12px currentColor";
            } else {
                indicador.style.opacity = "0.25";
                indicador.style.textShadow = "none";
            }

        });
    }

    actualizarJarvis();

    /* CREAR GEMA EN EL NODO CORRESPONDIENTE */

    if (!gemaActual) return;

    if (encontradas.includes(gemaActual.id)) return;

    const gema = document.createElement("button");
  const posicionesGemas = {
  nodo21: { top: "18%", left: "75%" },
  nodo32: { top: "65%", left: "15%" },
  nodo33: { top: "40%", left: "88%" },
  nodo41: { top: "80%", left: "60%" },
  nodo43: { top: "30%", left: "25%" },
  nodo44: { top: "55%", left: "50%" }
};

gema.style.top = posicionesGemas[nodoActual].top;
gema.style.left = posicionesGemas[nodoActual].left;

    gema.className = "gema-escondida " + gemaActual.color;
    gema.textContent = gemaActual.simbolo;
    gema.setAttribute("aria-label", "Gema del Infinito escondida");

    document.body.appendChild(gema);

    /* ENCONTRAR LA GEMA */

    gema.addEventListener("click", function () {

        if (encontradas.includes(gemaActual.id)) return;

        encontradas.push(gemaActual.id);

        localStorage.setItem(
            almacenamiento,
            JSON.stringify(encontradas)
        );

        /* EXPLOSION */

        const explosion = document.createElement("div");

        explosion.className = "explosion-gema";
        explosion.style.left = gema.getBoundingClientRect().left + "px";
        explosion.style.top = gema.getBoundingClientRect().top + "px";

        document.body.appendChild(explosion);

        gema.remove();

        actualizarJarvis();

        setTimeout(function () {
            explosion.remove();
        }, 700);

    });

});
