import { Proyecto } from "./Proyecto.js";
import { Puntajes } from "./Puntajes.js";
import { ProyectoRepositorio } from "./ProyectosRepositorio.js";

describe("PlayTDD", () => {
  let Clasemetricas, proyecto, puntajes, proyectosRepositorio;
  beforeEach(() => {
    proyecto = new Proyecto("titulo", "descripcion");
    //Clasemetricas = new Metricas();
    puntajes = new Puntajes();
    proyectosRepositorio = new ProyectoRepositorio();
  });

  it('Debería retornar 8 cuando el porcentaje de commits con pruebas es entre 0% y 60%', () => {
    puntajes.totalCommits=5;
    puntajes.commitsConPruebas = 1;
    expect(puntajes.calcularPuntajePruebasTotal()).toEqual(8);
  });
  it('Debería retornar 12 cuando el porcentaje de commits con pruebas es entre 60% y 80%', () => {
    puntajes.totalCommits=5;
    puntajes.commitsConPruebas = 3;
    expect(puntajes.calcularPuntajePruebasTotal()).toEqual(12);
  });
  it('Debería retornar 16 cuando el porcentaje de commits con pruebas es entre 80% y 99%', () => {
    puntajes.totalCommits = 5;
    puntajes.commitsConPruebas = 4;
    expect(puntajes.calcularPuntajePruebasTotal()).toEqual(16);
  });
  it('Debería retornar 20 cuando el porcentaje de commits con pruebas es del 100%', () => {
    puntajes.totalCommits = 5;
    puntajes.commitsConPruebas = 5;
    expect(puntajes.calcularPuntajePruebasTotal()).toEqual(20);
  });

  it("Debería asignar un puntaje de 20 para una cantidad de <20 lineas modificadas", () => {
    expect(puntajes.obtenerPuntajeLineas(7)).toEqual(20); 
  });
  it("Debería asignar un puntaje de 16 para una cantidad de <40 lineas modificadas", () => {
    expect(puntajes.obtenerPuntajeLineas(34)).toEqual(16); 
  });
  it("Debería asignar un puntaje de 12 para una cantidad de <60 lineas modificadas", () => {
    expect(puntajes.obtenerPuntajeLineas(55)).toEqual(12); 
  });
  it("Debería asignar un puntaje de 8 para una cantidad de >60 lineas modificadas", () => {
    expect(puntajes.obtenerPuntajeLineas(65)).toEqual(8); 
  });


  it("Debería asignar un puntaje de 8 para una cantidad de 0 pruebas pasadas", () => {
    expect(puntajes.obtenerPuntajePruebas(0)).toEqual(8);
  });
  it("Debería asignar un puntaje de 20 para una cantidad de 1 pruebas pasadas", () => {
    expect(puntajes.obtenerPuntajePruebas(1)).toEqual(20); 
  });
 
 
  it("dado un vector de fechas devuelve la suma de la diferencia de días entre commits", () => {
    expect(puntajes.obtenerSumaDiferenciasEnDias(["12/04/2024-08:24", "13/04/2024-09:45", "14/04/2024-09:45", "15/04/2024-09:45"])).toEqual(3);
  });
  it("devuelve 0 si el vector tiene una sola fecha", () => {
    expect(puntajes.obtenerSumaDiferenciasEnDias(["12/04/2024-08:24"])).toEqual(0);
  });
  


  it("Debería asignar un puntaje de 20 para una cobertura >90%", () => {
    expect(puntajes.obtenerPuntajeCobertura(99)).toEqual(20); 
  });
  
  it("Debería asignar un puntaje de 16 para una cobertura >=80%", () => {
    expect(puntajes.obtenerPuntajeCobertura(83)).toEqual(16); 
  });
  
  it("Debería asignar un puntaje de 12 para una cobertura >=70%", () => {
    expect(puntajes.obtenerPuntajeCobertura(79)).toEqual(12); 
  });
  
  it("Debería asignar un puntaje de 8 para una cobertura <70%", () => {
    expect(puntajes.obtenerPuntajeCobertura(34)).toEqual(8); 
  });


  it("dada un array de fechas deberia devolver el promedio", () => {
    expect(puntajes.calcularPromedioPuntajeComplejidad(["Excelente", "Regular", "Deficiente", "Bueno"])).toEqual(14);
  });
  it("debería ignorar valores desconocidos", () => {
    expect(puntajes.calcularPromedioPuntajeComplejidad(["Excelente", "Malo", "Bueno"])).toEqual((20 + 16) / 3);
  });


  it("Debería devolver la palabra recomendacion solamente", () => {
    expect(puntajes.DevolverRecomendacionPorCommit(-1)).toEqual("recomendacion");
  });
  it("Debería devolver el 1mer mensaje de recomendacion si el puntaje es mayor a 21", () => {
    expect(puntajes.DevolverRecomendacionPorCommit(23)).toEqual("Tus prácticas de TDD son sólidas y consistentes. Demuestras un dominio sólido de las mejores prácticas y una comprensión profunda de cómo aplicarlas efectivamente en tu desarrollo.");
  });
  it("Debería devolver el 2do mensaje de recomendacion si el puntaje es menor a 20 y mayor a 10", () => {
    expect(puntajes.DevolverRecomendacionPorCommit(15)).toEqual("Tu práctica de TDD muestra un buen nivel de compromiso, pero aún hay margen para mejorar. Considera escribir pruebas más específicas y detalladas para abordar casos límite y asegurar una cobertura más completa.");
  });
  it("Debería devolver el 3er mensaje de recomendacion si el puntaje es menor a 10 y mayor o igual que 0", () => {
    expect(puntajes.DevolverRecomendacionPorCommit(9)).toEqual("Tu uso de TDD podría mejorar. Es importante escribir pruebas más exhaustivas y pensar más cuidadosamente en los casos de prueba para garantizar una mayor confiabilidad en el código.");
  });
  
  
  it("Debería devolver el mensaje de recomendacion final solamente", () => {
    expect(puntajes.DevolverRecomendacionFinal(-1)).toEqual("recomendacionFinal");
  });
  it("Debería devolver el mensaje de recomendacion final si tuvo al menos un 80% de buena practica de TDD en todo el proyecto", () => {
    expect(puntajes.DevolverRecomendacionFinal(58,3)).toEqual("En general apicaste TDD de manera adecuada, felicidades. Las pruebas estan en verde, modificaste pocas lineas de codigo por commit y el porcentaje de cobertura es elevado");
  });
  it("Debería devolver el mensaje de recomendacion final si tuvo al menos un 50% a 79% de de TDD en todo el proyecto", () => {
    expect(puntajes.DevolverRecomendacionFinal(54,4)).toEqual("En general aplicaste TDD pero hay espacio para mejorar, fijate que las pruebas esten en verde, que tengas un porcentaje de cobertura adecuado y que al modificar o generar codigo para las pruebas siempre vayas de a poco");
  });
  it("Debería devolver el mensaje de recomendacion final si tuvo menos de 50% de eficacia de TDD en todo el proyecto", () => {
    expect(puntajes.DevolverRecomendacionFinal(40,4)).toEqual("No aplicaste TDD de manera adecuada, hay mucho espacio para mejorar, puede que las pruebas no esten en verde, que escribas lineas de codigo inecesarias y muy genericas desde el principio y tengas muy bajo porcentaje de cobertura, necesitas practica");
  });


  it("si mi cantidad de dias promedio entre commits es menor o igual que 2 recibe un puntaje de 20", () => {
    expect(puntajes.obtenerPuntajeFrecuenciaCommits(2)).toEqual(20);
  });
  it("si mi cantidad de dias promedio entre commits es mayor a 2 y menor o igual a 3 recibe un puntaje de 16", () => {
    expect(puntajes.obtenerPuntajeFrecuenciaCommits(3)).toEqual(16);
  });
  it("si mi cantidad de dias promedio entre commits es mayor a 3 y menor o igual a 4 recibe un puntaje de 12", () => {
    expect(puntajes.obtenerPuntajeFrecuenciaCommits(4)).toEqual(12);
  });
  it("si mi cantidad de dias promedio entre commits es mayor a 4 recibe un puntaje de 8", () => {
    expect(puntajes.obtenerPuntajeFrecuenciaCommits(6)).toEqual(8);
  });


  it("si el promedio de los puntajes es mayor a 20 se le da el puntaje maximo que es 20", () => {
    expect(puntajes.obtenerPuntajeComplejidad(25)).toEqual(20);
  });
  it("si el promedio de los puntajes esta entre 16 y 20 se le asigna 16 como puntaje ", () => {
    expect(puntajes.obtenerPuntajeComplejidad(17)).toEqual(16);
  });
  it("si el promedio de los puntajes esta entre 12 y 16 se le asigna 12 como puntaje ", () => {
    expect(puntajes.obtenerPuntajeComplejidad(14)).toEqual(12);
  });
  it("si el promedio de los puntajes es menor que 12 se le asigna 8 como puntaje ", () => {
    expect(puntajes.obtenerPuntajeComplejidad(5)).toEqual(8);
  });

  
  it("debería calcular el promedio correctamente con valores positivos", () => {
  expect(puntajes.obtenerPromedioPuntajes([10, 20, 30, 0], 4)).toEqual(15);
});

it("debería devolver 0 si el array está vacío", () => {
  expect(puntajes.obtenerPromedioPuntajes([10, 20, 30], 0)).toEqual(0);
});


it("Debería agregar un puntaje", () => {
  puntajes.agregarPuntaje(1, 10, 94,"12/04/2024-08:24","Excelente");
  expect(puntajes.puntajesPruebas).toEqual([20]);
  expect(puntajes.puntajesLineas).toEqual([20]);
  expect(puntajes.puntajesCobertura).toEqual([20]);
  expect(puntajes.puntajesFrecuenciaCommits).toEqual([8]);
  expect(puntajes.puntajesComplejidadCommits).toEqual([8]);
});

it("No debería incrementar commitsConPruebas si vPruebas es menor a 1", () => {
  const puntajes = new Puntajes();
  puntajes.agregarPuntaje(0, 5, 70, "12/04/2024-08:24", "Buena");

  expect(puntajes.commitsConPruebas).toBe(0); 
  expect(puntajes.puntajesPruebas).toEqual([8]); 
});



it("Debería eliminar un puntaje correctamente", () => {
  puntajes.agregarPuntaje(0, 10, 80,"12/04/2024-08:24", "Excelente");
  puntajes.agregarPuntaje(0, 20, 96,"13/04/2024-08:24", "Regular");
  puntajes.eliminarPuntaje(0);
  expect(puntajes.puntajesPruebas).toEqual([8]);
  expect(puntajes.puntajesLineas).toEqual([16]);
  expect(puntajes.puntajesCobertura).toEqual([20]);
  expect(puntajes.puntajesFrecuenciaCommits).toEqual([8]);
  expect(puntajes.puntajesComplejidadCommits).toEqual([8]);
});

it("Debería decrementar commitsConPruebas si el puntajePruebas eliminado es mayor a 8", () => {
  const puntajes = new Puntajes(); 
  puntajes.agregarPuntaje(1, 5, 70, "12/04/2024-08:24", "Buena");
  expect(puntajes.puntajesPruebas[0]).toBeGreaterThan(8); 
  expect(puntajes.commitsConPruebas).toBe(1);
  puntajes.eliminarPuntaje(0);
  expect(puntajes.commitsConPruebas).toBe(0);
});


it("Debería eliminar un puntaje de Prueba correctamente", () => {
  puntajes.agregarPuntaje(5, 10, 80,"12/04/2024-08:24", "Excelente");
  puntajes.eliminarPuntaje(0);
  expect(puntajes.puntajesPruebas).toEqual([]);
});


 it("Debería obtener el puntaje de un commit correctamente", () => {
   puntajes.agregarPuntaje(0, 10, 80,"12/04/2024-08:24","Excelente");
  expect(puntajes.obtenerPuntajeCommit(0)).toEqual(60);
 });

  
it("Deberia devolver el titulo", () => {
  expect(proyecto.DevolverTitulo()).toEqual("titulo");
});

it("Deberia devolver la descripcion", () => {
  expect(proyecto.DevolverDescripcion()).toEqual("descripcion");
});

it("Deberia aumentar el contador", () => {
  expect(proyectosRepositorio.AgregarProyecto("titulo", "descripcion")).toEqual(1);
});

it("Deberia disminuir el contador", () => {
  proyectosRepositorio.AgregarProyecto("titulo", "descripcion")
  expect(proyectosRepositorio.EliminarProyectoPorTitulo("titulo")).toEqual(0);
});

it("Debería agregar los datos a una matriz vacía", () => {
  proyecto.AnadirMetricas(1, 10, 100, 90, "12/04/2024-08:24", "Excelente");
  expect(proyecto.DevolverMetricas()).toEqual([[1, 10, 100, 90,"12/04/2024-08:24", "Excelente"]]);
});

it("Deberia devolver la cantidad de commits por defecto (0)", () => {
  expect(proyecto.DevolverCantidadCommits()).toEqual(0);
});

it("Debería agregar los datos al final de una matriz no vacía", () => {
  proyecto.AnadirMetricas(1, 10, 100, 90,"12/04/2024-08:24", "Excelente");
  proyecto.AnadirMetricas(2, 20, 200, 80,"13/04/2024-08:24", "Regular");
  expect(proyecto.DevolverMetricas()).toEqual([[1, 10, 100, 90,"12/04/2024-08:24", "Excelente"], [2, 20, 200, 80,"13/04/2024-08:24", "Regular"]]);
});

it("Debería eliminar una métrica", () => {
  proyecto.AnadirMetricas(1, 10, 100, 90,"12/04/2024-08:24", "Excelente");
  proyecto.AnadirMetricas(2, 20, 200, 0,"13/04/2024-08:24", "Regular");
  expect(proyecto.DevolverMetricas().length).toEqual(2);

  proyecto.eliminarMetrica(0);

  expect(proyecto.DevolverMetricas().length).toEqual(1);
  expect(proyecto.DevolverMetricas()).toEqual([[2, 20, 200, 0,"13/04/2024-08:24", "Regular"]]); 
});

it("Deberia devolver puntajes", () => {
  expect(proyecto.DevolverPuntajes()).toEqual({"commitsConPruebas": 0, "complejidadCommits": [], "indiceLineas": 0, "puntajeTotal": 0, "puntajesCobertura": [], "puntajesComplejidadCommits": [], "puntajesFrecuenciaCommits": [], "puntajesLineas": [], "puntajesPruebas": [], "totalCommits": 0, "totalFechas": [], "totalLineas": []} );
});


it("Deberia devolver puntajes agrengado uno", () => {
  proyecto.AnadirPuntuacion(1,2,100,"01/05/2024-08:24","regular");
  proyecto.EliminarPuntaje(0);
  proyecto.ObtenerPuntajesCommit(0);
});

it("Debería calcular el promedio de puntaje de complejidad correctamente", () => {
  let vectorComplejidad = ["regular"]
  puntajes.calcularPromedioPuntajeComplejidad(vectorComplejidad);
});


it("Debería asignar un puntaje de 0 para el puntaje por Commit", () => {
  expect(puntajes.obtenerPuntajePorCommit(0,0,0)).toEqual(0);
});

it("Debería asignar un puntaje de 0 sumando los puntajes para el puntaje por Commit", () => {
  expect(puntajes.obtenerPuntajePorCommit(0,0,0)).toEqual(0);
});

it("Debería asignar un puntaje igual a la suma de los puntajes para el puntaje por Commit", () => {
  expect(puntajes.obtenerPuntajePorCommit(5,6,7)).toEqual(18);
});


});