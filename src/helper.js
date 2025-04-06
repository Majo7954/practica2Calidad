//const divContenedorMetricas = document.querySelector("#contenedorDeMetricas");

export function crearBoton(texto, manejador, indice) {
  const boton = document.createElement("button");
  boton.textContent = texto;
  boton.addEventListener("click", (event) => manejador(indice));
  return boton;
}

export function crearCeldaConTexto(fila, texto) {
  const celda = fila.insertCell();
  celda.textContent = texto;
}

export function limpiarTabla(tabla) {
  if (tabla) {
    while (tabla.rows.length > 1) {
      tabla.deleteRow(1);
    }
  } else {
    console.error("No se encontró la tabla para limpiar.");
  }
}

export function agregarFilasMetricas(tabla, metricas, obtenerPuntajeCommit, puntajes, borrarMetrica) {
  metricas.forEach((metrica, index) => {
    const fila = tabla.insertRow();
    metrica.forEach((dato) => crearCeldaConTexto(fila, dato));

    const celdaPuntaje = fila.insertCell();
    const puntajeCommit = obtenerPuntajeCommit(index);
    celdaPuntaje.textContent = puntajeCommit;

    const celdaRecomendacion = fila.insertCell();
    celdaRecomendacion.textContent = puntajes.DevolverRecomendacionPorCommit(puntajeCommit);

    const celdaAcciones = fila.insertCell();
    const botonEliminar = crearBoton("Eliminar", borrarMetrica, index);
    celdaAcciones.appendChild(botonEliminar);
  });
}

export function actualizarPuntajeTotal(puntajes, nombreContenedor) {
  let puntajeContenedor = document.getElementById("puntajeContenedor");
  if (!puntajeContenedor) {
    document.body.appendChild(puntajeContenedor);
  } else {
    puntajeContenedor.innerHTML = "";
  }

  nombreContenedor.appendChild(puntajeContenedor);

  const categorias = [
    { nombre: "Cantidad de Pruebas por Commit:  ", porcentaje: 20, puntaje: puntajes.calcularPuntajePruebasTotal() },
    { nombre: "Líneas de Código por Commit", porcentaje: 20, puntaje: puntajes.calcularPuntajeTotalLineas() },
    { nombre: "Porcentaje de Cobertura de Pruebas por Commit", porcentaje: 20, puntaje: puntajes.calcularPuntajeTotalCobertura()},
    { nombre: "Frecuencia de Commits", porcentaje: 20, puntaje: puntajes.calcularPromedioFrecuenciaCommits() },
    { nombre: "Complejidad de Código", porcentaje: 20, puntaje: puntajes.calcularPuntajeTotalComplejidadCodigo() }
  ];
  
  categorias.forEach(categoria => {
    const parrafo = document.createElement("p");
    //const calificacionTexto = obtenerCalificacionTexto(categoria.puntaje);
    parrafo.textContent = `${categoria.nombre} (${categoria.porcentaje}%): ${categoria.puntaje} puntos`; //(${calificacionTexto})`;
    puntajeContenedor.appendChild(parrafo);
  });
  const puntajeTotalParrafo = document.createElement("p");
  puntajeTotalParrafo.textContent = "Puntuación Total: " + puntajes.obtenerPuntajeTotal() + " puntos";
  puntajeContenedor.appendChild(puntajeTotalParrafo);
}

export function actualizarRecomendacionFinal(puntajes, proyectoActual, divContenedorProyectos) {
  let mensajeRecomendacion = document.getElementById("mensajeRecomendacion");
  if (!mensajeRecomendacion) {
    mensajeRecomendacion = document.createElement("p");
    mensajeRecomendacion.id = "mensajeRecomendacion";
    divContenedorProyectos.appendChild(mensajeRecomendacion);
  }
  let recomendacionFinal = puntajes.DevolverRecomendacionFinal(puntajes.obtenerPuntajeTotal(), proyectoActual.DevolverCantidadCommits());
  mensajeRecomendacion.textContent = "Recomendacion Final del proyecto: " + recomendacionFinal;
}
