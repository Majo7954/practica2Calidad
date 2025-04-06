export class Puntajes {
  constructor() {
    this.puntajesPruebas = [];
    this.puntajesLineas = [];
    this.puntajesCobertura = [];
    this.puntajesFrecuenciaCommits=[];
    this.puntajeTotal = 0;
    this.commitsConPruebas = 0;
    this.totalCommits = 0;
    this.totalLineas = [];
    this.indiceLineas = 0;
    this.totalFechas=[];
    this.puntajesComplejidadCommits=[];
    this.complejidadCommits=[];
  }

  agregarPuntaje(vPruebas, vLineas, vCobertura,vFecha,vComplejidad) {
    this.totalCommits++;

    const puntajePruebas = this.obtenerPuntajePruebas(vPruebas);
    const puntajeLineas = this.obtenerPuntajeLineas(vLineas);
    const puntajeCobertura = this.obtenerPuntajeCobertura(vCobertura);
    const puntajeFrecuenciaCommits=this.obtenerPuntajeFrecuenciaCommits(vFecha);
    const puntajeComplejidadCommits=this.obtenerPuntajeComplejidad(vComplejidad);
    this.puntajesPruebas.push(puntajePruebas);
    this.puntajesLineas.push(puntajeLineas);
    this.puntajesCobertura.push(puntajeCobertura);
    this.puntajesFrecuenciaCommits.push(puntajeFrecuenciaCommits);
    this.puntajesComplejidadCommits.push(puntajeComplejidadCommits);
    if (vPruebas >= 1) {
      this.commitsConPruebas++;
    }

    this.puntajeTotal = this.calcularPuntajeTotal();
  }

  eliminarPuntaje(index) {
    if (this.puntajesPruebas[index] > 8) {
      this.commitsConPruebas--;
    }

    this.puntajeTotal -= this.puntajesPruebas[index] + this.puntajesLineas[index] + this.puntajesCobertura[index]+this.puntajesFrecuenciaCommits[index]+this.puntajesComplejidadCommits[index]; 
    this.puntajesPruebas.splice(index, 1);
    this.puntajesLineas.splice(index, 1);
    this.puntajesCobertura.splice(index, 1);
    this.puntajesFrecuenciaCommits.splice(index, 1);
    this.puntajesComplejidadCommits.splice(index, 1);
    this.totalCommits--;
    this.puntajeTotal = this.calcularPuntajeTotal();
  }

  obtenerPuntajeCommit(index) {
    return this.puntajesPruebas[index] + this.puntajesLineas[index] + this.puntajesCobertura[index] +this.puntajesFrecuenciaCommits[index]+this.puntajesComplejidadCommits[index];
  }

  obtenerPuntajeTotal() {
    return this.puntajeTotal;
  }

  calcularPuntajeTotal() {
    let total = 0;
    
    total += this.calcularPuntajePruebasTotal();

    total += this.calcularPuntajeTotalLineas();

    total += this.calcularPuntajeTotalCobertura();

    total+=this.calcularPromedioFrecuenciaCommits();

    total+=this.calcularPuntajeTotalComplejidadCodigo();

    return total;
  }

  obtenerPromedioPuntajes(vectorPuntajes){
    let sumaPuntajes=0;
    for (let i = 0; i < vectorPuntajes.length; i++) {
      sumaPuntajes += vectorPuntajes[i];
    }
    console.log("Suma lineas: " + sumaPuntajes)
    let promedioPuntaje=0;
    promedioPuntaje=sumaPuntajes/this.totalCommits;
    return promedioPuntaje;
  }

  calcularPuntajePruebasTotal() {
    const porcentajeCommitsConPruebas = (this.commitsConPruebas / this.totalCommits) * 100;
    if (porcentajeCommitsConPruebas >= 100) {
      return 20;
    } else if (porcentajeCommitsConPruebas >= 80) {
      return 16;
    } else if (porcentajeCommitsConPruebas >= 60) {
      return 12;
    } else {
      return 8;
    }
  }

  obtenerPuntajePruebas(vPruebas) {
    if (vPruebas >= 1) {
      return 20;
    } else {
      return 8;
    }
  }
  
  obtenerPuntajeLineas(cantidadLineasModificadas) {
    this.totalLineas[this.indiceLineas] = cantidadLineasModificadas;
    this.indiceLineas++;
    if (cantidadLineasModificadas < 20) {
      return 20;
     }else if (cantidadLineasModificadas < 40) {
       return 16;
    } else if (cantidadLineasModificadas < 60){
      return 12;
    } else {
      return 8
    }
   }

   calcularPuntajeTotalLineas() {
    const promedioPuntajeLineas = this.obtenerPromedioPuntajes(this.totalLineas);
    return this.obtenerPuntajeLineas(promedioPuntajeLineas);
  }


  calcularDiferenciaEnDias(fechaHora1, fechaHora2) {
    const [fecha1, hora1] = fechaHora1.split("-");
    const [fecha2, hora2] = fechaHora2.split("-");
    const fechaHoraInicial = new Date(fecha1.split("/").reverse().join("-") + "T" + hora1);
    const fechaHoraFinal = new Date(fecha2.split("/").reverse().join("-") + "T" + hora2);
    const unDia = 24 * 60 * 60 * 1000;
  
    const tiempoInicial = fechaHoraInicial.getTime();
    const tiempoFinal = fechaHoraFinal.getTime();
    const diferenciaEnMilisegundos = tiempoFinal - tiempoInicial;
    const diferenciaEnDias = diferenciaEnMilisegundos / unDia;
    return Math.floor(diferenciaEnDias);
  }
  
  obtenerSumaDiferenciasEnDias(vectorFechas) {
    let sumaDias = 0;
    for (let i = 0; i < vectorFechas.length - 1; i++) {
      let diferencia = this.calcularDiferenciaEnDias(vectorFechas[i], vectorFechas[i + 1]);
      sumaDias += diferencia;
    }
    return sumaDias;
  }
  obtenerPuntajeFrecuenciaCommits(promedioDias)
    {
      if(promedioDias<=2)
        {
          return 20;
        }
        else if(promedioDias>2 && promedioDias<=3)
          {
            return 16;
          }
          else if(promedioDias>3 && promedioDias<=4)
            {
              return 12;
            } 
            else
            {
              return 8;
            }
    }
   calcularPromedioFrecuenciaCommits()
   {
     const promedioPuntajeFrecuencia=this.obtenerSumaDiferenciasEnDias(this.totalFechas);
     const promedioDias=promedioPuntajeFrecuencia/this.totalCommits-1;
     return this.obtenerPuntajeFrecuenciaCommits(promedioDias);
   }



    obtenerPuntajeCobertura(porcentajeCobertura) {
      if (porcentajeCobertura > 90) {
        return 20;
      } else if (porcentajeCobertura >= 80) {
        return 16;
      } else if (porcentajeCobertura >= 70){
        return 12;
      } else {
        return 8;
      }
    }

    calcularPuntajeTotalCobertura() {
      let promedioPuntajeCobertura = 0;
      promedioPuntajeCobertura = this.obtenerPromedioPuntajes(this.puntajesCobertura);
      return promedioPuntajeCobertura;
  }
  
    obtenerPuntajePorCommit(puntajePruebas, puntajeLineas, puntajeCobertura) {
      return puntajePruebas + puntajeLineas + puntajeCobertura;
    }
   

    
    obtenerPuntajeComplejidad(promedioPuntajeComplejidad)
    {
      if(promedioPuntajeComplejidad>=20)
        {
          return 20;
        }
        else if(promedioPuntajeComplejidad>=16 && promedioPuntajeComplejidad<20)
          {
            return 16;
          }
          else if(promedioPuntajeComplejidad>=12 && promedioPuntajeComplejidad<16)
            {
              return 12;
            }
            else 
              {
                return 8;
              }
    }
    
    calcularPromedioPuntajeComplejidad(vectorComplejidad)
    {
      const valores = {
        "Excelente": 20,
        "Regular": 12,
        "Deficiente": 8,
        "Bueno": 16
      };
      let suma = 0;
      vectorComplejidad.forEach(item => {
      if (valores.hasOwnProperty(item)) {
      suma += valores[item];
       }
      });
    const promedio = suma / vectorComplejidad.length;
    return promedio 
  }
    calcularPuntajeTotalComplejidadCodigo()
    {
      const promedioPuntajeComplejidad= this.calcularPromedioPuntajeComplejidad(this.complejidadCommits);
      return this.obtenerPuntajeComplejidad(promedioPuntajeComplejidad);
    }
    DevolverRecomendacionPorCommit(puntajeCommit) {
        let recomendacion = "recomendacion"
  
        if (puntajeCommit>=21){
          recomendacion = "Tus prácticas de TDD son sólidas y consistentes. Demuestras un dominio sólido de las mejores prácticas y una comprensión profunda de cómo aplicarlas efectivamente en tu desarrollo."
        }else if (puntajeCommit<=20 && puntajeCommit>10){
          recomendacion = "Tu práctica de TDD muestra un buen nivel de compromiso, pero aún hay margen para mejorar. Considera escribir pruebas más específicas y detalladas para abordar casos límite y asegurar una cobertura más completa."
        } else if (puntajeCommit>=0){
          recomendacion = "Tu uso de TDD podría mejorar. Es importante escribir pruebas más exhaustivas y pensar más cuidadosamente en los casos de prueba para garantizar una mayor confiabilidad en el código."
        }
        return recomendacion
    }
  
    DevolverRecomendacionFinal(puntajeTotal, cantidadCommits) {
        let recomendacion = "recomendacionFinal";
        let porcentaje=(puntajeTotal/(cantidadCommits*21))*100;
        if(porcentaje>=80)
        {
          recomendacion="En general apicaste TDD de manera adecuada, felicidades. Las pruebas estan en verde, modificaste pocas lineas de codigo por commit y el porcentaje de cobertura es elevado"
        }
        else if(porcentaje>=50 && porcentaje<80)
        {
          recomendacion="En general aplicaste TDD pero hay espacio para mejorar, fijate que las pruebas esten en verde, que tengas un porcentaje de cobertura adecuado y que al modificar o generar codigo para las pruebas siempre vayas de a poco";
        }
        else if(porcentaje<50)
        {
          recomendacion="No aplicaste TDD de manera adecuada, hay mucho espacio para mejorar, puede que las pruebas no esten en verde, que escribas lineas de codigo inecesarias y muy genericas desde el principio y tengas muy bajo porcentaje de cobertura, necesitas practica";
        }
        return recomendacion;
    }
  }
  