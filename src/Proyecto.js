import { Puntajes } from "./Puntajes.js";

export class Proyecto {
  constructor(titulo, descripcion) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.metricas = [];
    this.cantidadCommits = 0;
    this.puntajes = new Puntajes();
  }
  
  DevolverCantidadCommits() {
    return this.cantidadCommits;
  }

  DevolverTitulo() {
    return this.titulo;
  }
  
  DevolverDescripcion() {
    return this.descripcion;
  }

  DevolverMetricas(){
    return this.metricas;
  }

  AnadirMetricas(nro_commit, cant_pruebas, cant_lineas, porc_cobertura, fecha_commit, comp_codigo) {
    this.cantidadCommits++;
    return this.metricas.push([nro_commit, cant_pruebas, cant_lineas, porc_cobertura,fecha_commit,comp_codigo]);
    //return this.metricas;
  }
  
  eliminarMetrica(index) {
    this.cantidadCommits--;
    this.metricas.splice(index, 1);
    return this.metricas;
  }

  DevolverPuntajes() {
    return this.puntajes;
  }

  AnadirPuntuacion(vPruebas, vLineas, vCobertura,vFecha,vComplejidad){
    return this.puntajes.agregarPuntaje(vPruebas, vLineas, vCobertura,vFecha,vComplejidad);
  }

  EliminarPuntaje(index) {
    return this.puntajes.eliminarPuntaje(index);
  }

  ObtenerPuntajesCommit(index){
    return this.puntajes.obtenerPuntajeCommit(index);
  }
}
  