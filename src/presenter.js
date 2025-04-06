import { Puntajes } from "./Puntajes.js";
import { ProyectoRepositorio } from "./ProyectosRepositorio.js";
import { crearBoton, limpiarTabla, agregarFilasMetricas, actualizarPuntajeTotal, actualizarRecomendacionFinal } from "./helper.js";

const inputTituloProyecto = document.querySelector("#tituloDelProyecto");
const inputDescripcionProyecto = document.querySelector("#descripcionDelProyecto");
const formCrearProyecto = document.querySelector("#formularioCrearProyecto");
const divListaProyectos = document.querySelector("#listaDeProyectos");
const divContenedorProyectos = document.querySelector("#contenedorDeProyectos");
const divContenedorMetricas = document.querySelector("#contenedorDeMetricas");
const botonVolverAProyectos = document.querySelector("#botonVolverAProyectos");
const listaDeMetricas = document.getElementById("listaDeMetricas");

let puntajeContenedor = document.getElementById("puntajeContenedor"); 
if (!puntajeContenedor) {
  puntajeContenedor = document.createElement("div");
  puntajeContenedor.id = "puntajeContenedor";
  divContenedorMetricas.appendChild(puntajeContenedor);
}
puntajeContenedor.style.display = 'block';
// Leer y Procesar Archivo

const inputArchivoMetricas = document.getElementById("archivoMetricas");
const botonSubirArchivo = document.getElementById("botonSubirArchivoMetricas");

function procesarArchivoMetricas(event) {
  const archivo = inputArchivoMetricas.files[0];
  if (archivo) {
    const lector = new FileReader();
    lector.onload = function(e) {
      const contenido = e.target.result;
      const lineas = contenido.split("\n");
      lineas.forEach(linea => {
        if (linea.trim()) {
          const [nro_commit, fecha_commit, cant_pruebas, cant_lineas, porc_cobertura, comp_codigo] = linea.split(",").map(item => item.trim());
          agregarMetricaDesdeArchivo(nro_commit, fecha_commit, parseInt(cant_pruebas), parseInt(cant_lineas), parseInt(porc_cobertura), comp_codigo);
        }
      });
      // Después de agregar las métricas, actualiza la tabla y los puntajes
      actualizarTabla();
      actualizarPuntajeTotal(puntajes, divContenedorMetricas);
    };
    lector.readAsText(archivo);
  }
}


function agregarMetricaDesdeArchivo(nro_commit, fecha_commit, cant_pruebas, cant_lineas, porc_cobertura, comp_codigo) {
  proyectoActual.AnadirMetricas(nro_commit, cant_pruebas, cant_lineas, porc_cobertura, fecha_commit, comp_codigo);
  proyectoActual.AnadirPuntuacion(cant_pruebas, cant_lineas, porc_cobertura, fecha_commit, comp_codigo);
  //puntajes.agregarPuntaje(cant_pruebas, cant_lineas, porc_cobertura, fecha_commit, comp_codigo);
}

botonSubirArchivo.addEventListener("click", procesarArchivoMetricas);

//Fin de Leer y Procesar Archivo


let repositorioDeProyectos = new ProyectoRepositorio();
let proyectoActual;
//let puntajes = new Puntajes();

function agregarMetrica() {
  const vCommit = document.getElementById("nro_commit").value;
  const vPruebas = parseInt(document.getElementById("cant_pruebas").value);
  const vLineas = parseInt(document.getElementById("cant_lineas").value);
  const vCobertura = parseInt(document.getElementById("porc_cobertura").value);
  const vFecha= document.getElementById("fecha_commit").value;
  const vComplejidad= document.getElementById("comp_codigo").value;
  proyectoActual.AnadirMetricas(vCommit, vPruebas, vLineas, vCobertura,vFecha,vComplejidad);
  proyectoActual.AnadirPuntuacion(vPruebas, vLineas, vCobertura,vFecha,vComplejidad);

  document.getElementById("nro_commit").value = "";
  document.getElementById("cant_pruebas").value = "";
  document.getElementById("cant_lineas").value = "";
  document.getElementById("porc_cobertura").value = "";
  document.getElementById("fecha_commit").value="";
  document.getElementById("comp_codigo").value="";
  actualizarTabla();
}

function borrarMetrica(index) {
  proyectoActual.eliminarMetrica(index);
  proyectoActual.EliminarPuntaje(index);

  actualizarTabla();
}

function obtenerPuntajeCommit(index) {
  return proyectoActual.ObtenerPuntajesCommit(index);
}

function construirFilaMetrica(metrica, indice) {
  const fila = document.createElement("tr");
  metrica.forEach((dato) => {
    const celda = document.createElement("td");
    celda.textContent = dato;
    fila.appendChild(celda);
  });
  const celdaAcciones = document.createElement("td");
  const botonEliminarMetrica = crearBoton("Eliminar Métrica", borrarMetrica, indice);
  celdaAcciones.appendChild(botonEliminarMetrica);
  fila.appendChild(celdaAcciones);;
  return fila;
}

function construirTablaMetricas() {
  let tablaMetricas = document.getElementById("tablaMetricas");
  if (!tablaMetricas) {
    tablaMetricas = document.createElement("table");
    tablaMetricas.id = "tablaMetricas";
    const header = tablaMetricas.createTHead();
    const row = header.insertRow();
    const headers = ["Número de Commit", "Cantidad de Pruebas", "Cantidad de Líneas", "Porcentaje de Cobertura", "Frecuencia del commit","Complejidad del codigo","Puntaje por Commit", "Recomendación por Commit", "Acciones"];
    headers.forEach(headerText => {
      const th = document.createElement("th");
      th.textContent = headerText;
      row.appendChild(th);
    });
    divContenedorMetricas.appendChild(tablaMetricas);
  }
  return tablaMetricas;
}

function mostrarTablaMetricas() {
  let tablaMetricas = document.getElementById("tablaMetricas");

  if (!tablaMetricas) {
    tablaMetricas = construirTablaMetricas();
    listaDeMetricas.appendChild(tablaMetricas);
  } else {
    limpiarTabla(tablaMetricas);
  }

  proyectoActual.DevolverMetricas().forEach((metrica, indice) => {
    const filaMetrica = construirFilaMetrica(metrica, indice);
    tablaMetricas.appendChild(filaMetrica);
  });

  // Asegurarse de que se actualicen los puntajes y recomendaciones al mostrar la tabla
  actualizarTabla();
}


function actualizarTabla() {
  let tablaMetricas = document.getElementById("tablaMetricas");
  if (!tablaMetricas) {
    tablaMetricas = construirTablaMetricas();
    listaDeMetricas.appendChild(tablaMetricas);
  }

  limpiarTabla(tablaMetricas);

  agregarFilasMetricas(
    tablaMetricas,
    proyectoActual.DevolverMetricas(),
    obtenerPuntajeCommit,
    proyectoActual.DevolverPuntajes(),
    borrarMetrica
  );

  actualizarPuntajeTotal(proyectoActual.DevolverPuntajes(), divContenedorMetricas);
  actualizarRecomendacionFinal(proyectoActual.DevolverPuntajes(), proyectoActual, divContenedorProyectos);
}


formCrearProyecto.addEventListener("submit", (event) => {
  event.preventDefault();

  const tituloProyecto = inputTituloProyecto.value;
  const descripcionProyecto = inputDescripcionProyecto.value;
  repositorioDeProyectos.AgregarProyecto(tituloProyecto, descripcionProyecto);
  mostrarProyectos();
  inputTituloProyecto.value = "";
  inputDescripcionProyecto.value = "";
});

function mostrarProyectos() {
  divListaProyectos.innerHTML = "";
  repositorioDeProyectos.proyectos.forEach((proyecto, indice) => {
    const informacionProyecto = document.createElement("p");
    informacionProyecto.textContent = `${proyecto.DevolverTitulo()} : ${proyecto.DevolverDescripcion()}`;
    informacionProyecto.dataset.index = indice;
    const botonEliminar = crearBoton("Eliminar", eliminarProyecto, indice);
    const botonIrAMetricas = crearBoton("Ir a Métricas", mostrarFormularioMetricas, indice);
    const botonEditar = crearBoton("Editar", editarProyecto, indice);
    informacionProyecto.appendChild(botonEliminar);
    informacionProyecto.appendChild(botonIrAMetricas);
    informacionProyecto.appendChild(botonEditar);
    divListaProyectos.appendChild(informacionProyecto);
  });
}

function editarProyecto(indice) {
  const nuevoTitulo = prompt("Ingrese el nuevo título del proyecto:");
  const nuevaDescripcion = prompt("Ingrese la nueva descripción del proyecto:");

  if (nuevoTitulo && nuevaDescripcion) {
    const proyecto = repositorioDeProyectos.proyectos[indice];
    proyecto.titulo = nuevoTitulo;
    proyecto.descripcion = nuevaDescripcion;
    mostrarProyectos();
  } else {
    alert("Debe ingresar un título y una descripción.");
  }
}

function eliminarProyecto(indice) {
  const tituloDelProyecto = repositorioDeProyectos.proyectos[indice].DevolverTitulo();
  const confirmacionAceptada = confirm(`¿Estás seguro de eliminar el proyecto "${tituloDelProyecto}"?`);
  if (confirmacionAceptada) {
    repositorioDeProyectos.EliminarProyectoPorTitulo(tituloDelProyecto);
    mostrarProyectos();
  } else {
    return;
  }
}

function mostrarFormularioMetricas(indice) {
  divContenedorProyectos.style.display = 'none';
  divContenedorMetricas.style.display = 'block';
  proyectoActual = repositorioDeProyectos.proyectos[indice];

  listaDeMetricas.innerHTML = "";
  document.getElementById("botonAgregarMetrica").addEventListener("click", agregarMetrica);
  //puntajes = new Puntajes(proyectoActual.DevolverMetricas());

  mostrarTablaMetricas();
  
  let puntajeContenedor = document.getElementById("puntajeContenedor");
  if (!puntajeContenedor) {
    puntajeContenedor = document.createElement("div");
    puntajeContenedor.id = "puntajeContenedor";
    divContenedorMetricas.appendChild(puntajeContenedor);
  }

  puntajeContenedor.style.display = 'block';
  actualizarTabla();
}

botonVolverAProyectos.addEventListener("click", () => {
  divContenedorMetricas.style.display = 'none';
  divContenedorProyectos.style.display = 'block';
  puntajeContenedor.style.display = 'none';

  // Remover el event listener del botón agregar métrica para evitar múltiples anexiones
  document.getElementById("botonAgregarMetrica").removeEventListener("click", agregarMetrica);
});
