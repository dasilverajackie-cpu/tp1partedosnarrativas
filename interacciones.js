
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
