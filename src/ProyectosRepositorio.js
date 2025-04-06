import { Proyecto } from "./Proyecto";

export class ProyectoRepositorio {
    constructor() {
        this.proyectos = [];
        this.contador = 0;
    }

    AgregarProyecto(titulo, descripcion) {
        const proyecto = new Proyecto(titulo, descripcion);
        this.proyectos.push(proyecto);
        this.contador += 1;
        console.log("Valor del contador:", this.contador);
        return this.contador;
    }

    EliminarProyectoPorTitulo(titulo){
        const indice = this.proyectos.findIndex(proyecto => proyecto.titulo === titulo);
        this.proyectos.splice(indice, 1)[0];
        this.contador -= 1;
        console.log("Valor del contador:", this.contador);
        return this.contador;
    }
}