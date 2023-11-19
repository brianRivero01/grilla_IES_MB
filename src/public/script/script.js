// Obtén todos los campos de entrada
const inputs_A_titulo = document.querySelectorAll('input[name="points-a-titulo"]');
inputs_A_titulo.forEach(input => {
    // Agrega un controlador de eventos para el evento "input"
    input.addEventListener('input', () => {
        calcularTotal(inputs_A_titulo, '.total-a-titulo', '.valor-asignado-a', 16,grupoTotales);
    });
});

const inputs_B_formacion_posterior = document.querySelectorAll('input[name="points-b-formacion-posterior"]');
inputs_B_formacion_posterior.forEach(input => {
    // Agrega un controlador de eventos para el evento "input"
    input.addEventListener('input', () => {
        calcularTotal(inputs_B_formacion_posterior, '.total-b-formacion-posterior', '.valor-asignado-b', 6,grupoTotales);
    });
});

const inputs_C_antiguedad_docente = document.querySelectorAll('input[name="points-c-antiguedad-docente"]');
inputs_C_antiguedad_docente.forEach(input => {
    // Agrega un controlador de eventos para el evento "input"
    input.addEventListener('input', () => {
        calcularTotal(inputs_C_antiguedad_docente, '.total-c-antiguedad-docente', '.valor-asignado-c', 15,grupoTotales);
    });
});

const inputs_D_participacion_eventos = document.querySelectorAll('input[name="points-d-participacion-eventos"]');
inputs_D_participacion_eventos.forEach(input => {
    // Agrega un controlador de eventos para el evento "input"
    input.addEventListener('input', () => {
        calcularTotal(inputs_D_participacion_eventos, '.total-d-participacion-eventos', '.valor-asignado-d', 5,grupoTotales);
    });
});

const inputs_E_elaboracion_y_dictados = document.querySelectorAll('input[name="points-e-elaboracion-y-dictados"]');
inputs_E_elaboracion_y_dictados.forEach(input => {
    // Agrega un controlador de eventos para el evento "input"
    input.addEventListener('input', () => {
        calcularTotal(inputs_E_elaboracion_y_dictados, '.total-e-elaboracion-y-dictados', '.valor-asignado-e', 12,grupoTotales);
    });
});

const inputs_F_trabajos_de_investigacion = document.querySelectorAll('input[name="points-f-trabajos-de-investigacion"]');
inputs_F_trabajos_de_investigacion.forEach(input => {
    // Agrega un controlador de eventos para el evento "input"
    input.addEventListener('input', () => {
        calcularTotal(inputs_F_trabajos_de_investigacion, '.total-f-trabajos-de-investigacion', '.valor-asignado-f', 6,grupoTotales);
    });
});

const inputs_g = document.querySelectorAll('input[name="points-g"]');
inputs_g.forEach(input => {
    // Agrega un controlador de eventos para el evento "input"
    input.addEventListener('input', () =>{
        calcularTotal(inputs_g,'.total-g','.valor-asignado-g',12,grupoTotales)
    });
});

const inputs_h = document.querySelectorAll('input[name="points-h"]');
inputs_h.forEach(input => {
    // Agrega un controlador de eventos para el evento "input"
    input.addEventListener('input', () =>{
        calcularTotal(inputs_h,'.total-h','.valor-asignado-h',8,grupoTotales)
    });
});

const inputs_i = document.querySelectorAll('input[name="points-i"]');
inputs_i.forEach(input => {
    // Agrega un controlador de eventos para el evento "input"
    input.addEventListener('input', () =>{
        calcularTotal(inputs_i,'.total-i','.valor-asignado-i',5,grupoTotales)
    });
});

const inputs_j = document.querySelectorAll('input[name="points-j"]');
inputs_j.forEach(input => {
    // Agrega un controlador de eventos para el evento "input"
    input.addEventListener('input', () =>{
        calcularTotal(inputs_j,'.total-j','.valor-asignado-j',10,grupoTotales)
    });
});

const inputs_k = document.querySelectorAll('input[name="points-k"]');
inputs_k.forEach(input => {
    // Agrega un controlador de eventos para el evento "input"
    input.addEventListener('input', () =>{
        calcularTotal(inputs_k,'.total-k','.valor-asignado-k',10,grupoTotales)
    });
});

const inputs_l = document.querySelectorAll('input[name="points-l"]');
inputs_l.forEach(input => {
    // Agrega un controlador de eventos para el evento "input"
    input.addEventListener('input', () =>{
        calcularTotal(inputs_l,'.total-l','.valor-asignado-l',30,grupoTotales)
    });
});

function calcularTotal(input, totalSelector, valorAsignadoSelector, valorMaximo, grupoTotales) {
    let total = 0;
    input.forEach(input => {
        const valorAsignado = parseFloat(input.value);
        total += valorAsignado;

        const valorAsignadoElement = input.parentElement.parentElement.querySelector(valorAsignadoSelector);
        valorAsignadoElement.textContent = total.toFixed(2);
    });

    total = total > valorMaximo ? valorMaximo : total;

    const totalElement = document.querySelector(totalSelector);
    totalElement.textContent = total.toFixed(2);

    // Actualiza el total del grupo
    grupoTotales[totalSelector] = total;

    // Calcula y actualiza el total general
    const totalGeneral = Object.values(grupoTotales).reduce((acc, val) => acc + val, 0);
    const totalGeneralElement = document.querySelector('.total-co');
    totalGeneralElement.textContent = totalGeneral.toFixed(2);
}

const grupoTotales = [];

//Funcion para enviar los datos

    document.getElementById('enviarDatos').addEventListener('click', function () {
      //Totales de cada tabla
      const nombreInput = document.getElementById("nombre");

      const totalAValue = document.querySelector('.total-a-titulo').textContent;
      const totalBValue = document.querySelector('.total-b-formacion-posterior').textContent;
      const totalCValue = document.querySelector('.total-c-antiguedad-docente').textContent;
      const totalDValue = document.querySelector('.total-d-participacion-eventos').textContent;
      const totalEValue = document.querySelector('.total-e-elaboracion-y-dictados').textContent;
      const totalFValue = document.querySelector('.total-f-trabajos-de-investigacion').textContent;
      const totalGValue = document.querySelector('.total-g-publicaciones').textContent;
      const totalHValue = document.querySelector('.total-h-asistencia-a-cursos').textContent;
      const totalIValue = document.querySelector('.total-i-desempeño-laborales').textContent;
      const totalJValue = document.querySelector('.total-j-gestion-superior').textContent;
      const totalKValue = document.querySelector('.total-k-otras-actividades').textContent;
      const totalLValue = document.querySelector('.total-l-desempeño-laboral-especifico').textContent;
      const totalValue = document.querySelector('.total-promedio').textContent;


      const data = { 
        nombreDocente: nombreInput.value,
        totalA: totalAValue, totalB: totalBValue, totalC: totalCValue, totalD: totalDValue,
        totalE: totalEValue, totalF: totalFValue, totalG: totalGValue, totalH: totalHValue,
        totalI: totalIValue, totalJ: totalJValue, totalK: totalKValue, totalL: totalLValue,
        total:totalValue,
      };

      // Realizar la solicitud POST al servidor
      fetch('/api/enviarDatos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    });


    



    



