let calcularIMC = () => {
  const estatura = document.getElementById('estatura').value;
  const peso = document.getElementById('peso').value;
  if (estatura && peso) {
    let imc = peso / ((estatura /100) **2);
    return imc.toFixed(2); 
  } else {
    return 'Ingresa los datos requeridos';
  }
};
let clasificarIMC = (imc) => {
  if (imc < 18.5) {
    return 'bajo peso';
  } else if (imc >= 18.5 && imc < 25) {
    return 'peso adecuado';
  } else {
    return 'sobrepeso';
  }
};
let actualizarResultado =() => {
  let resultadoElement = document.getElementById('resultado');
  let IMCElement = document.getElementById('IMC');
  let imc = calcularIMC();
  resultadoElement.value = imc;
  IMCElement.innerHTML = ` Tiene ${clasificarIMC(imc)}`;
};
document.getElementById('calcular').addEventListener('click', actualizarResultado);

const exchangeRates = {
  USD: {
    COP: 3900.20,
    USD: 1,
    ARS: 919.25,
    MXN: 17.64
  },
  COP: {
    USD: 0.000256,
    COP: 1,
    ARS: 0.23,
    MXN: 0.0044
  },
  ARS: {
    USD: 0.0011,
    COP: 4.30,
    ARS: 1,
    MXN: 0.019
  },
  MXN: {
    USD: 0.057,
    COP: 224.11,
    ARS: 52.13,
    MXN: 1
  }
};

let convertCurrency = () => {
  let fromCurrency = document.getElementById('fromCurrency').value;
  let toCurrency = document.getElementById('toCurrency').value;
  let amount = parseFloat(document.getElementById('amount').value);

  if (isNaN(amount) || amount <= 0) {
    document.getElementById('convertedAmount').textContent = 'Invalid amount';
    return;
  }

  let conversionRate = exchangeRates[fromCurrency][toCurrency];
  let convertedAmount = (amount * conversionRate).toFixed(2);
  document.getElementById('convertedAmount').textContent = convertedAmount;
};

document.getElementById('fromCurrency').addEventListener('change', convertCurrency);
document.getElementById('toCurrency').addEventListener('change', convertCurrency);
document.getElementById('amount').addEventListener('input', convertCurrency);

convertCurrency();

let listaNotas = [
  {
    id: 1,
    titulo: 'Sacar la basura',
    texto: 'Mi mamá me va a retar si no lo hago',
    realizada: false
  },
  {
    id: 2,
    titulo: 'Comprar leche',
    texto: 'Necesitamos leche para el desayuno',
    realizada: false
  }
];

let idGlobal = 2;
pintarNotas(listaNotas);

function pintarNotas(listaNotas) {
  let contenedorNotas = document.getElementById('listaNotas');
  let mensajeSinNotas = document.getElementById('mensaje-sin-notas');

  for (let i = 0; i < listaNotas.length; i++) {
    let nota = document.createElement('div');
    nota.classList.add('nota');
    nota.innerHTML = `
    <div class="realizadaa">
      <input onclick="marcarRealizada(${listaNotas[i].id})" type="checkbox" class="realizada" ${listaNotas[i].realizada ? 'checked' : ''}>
      <p>Marcar como realizada</p>
    </div>
    <div class="resto">
      <h3>${listaNotas[i].titulo}</h3>
      <p>${listaNotas[i].texto}</p>
      <button class="eliminar" onclick="borrarNota(${listaNotas[i].id})">Borrar nota</button>
    </div>
    `;
    contenedorNotas.appendChild(nota);
  }
}
if (listaNotas.length === 0) {
  mensajeSinNotas.classList.remove('oculto');
}

function crearNota() {
  let nota = {
    id: ++idGlobal,
    titulo: Titulo.value,
    texto: Contenido.value,
    realizada: false
  };
  listaNotas.push(nota);
  pintarNotas(listaNotas);
}

function marcarRealizada (id) {
  for (let i = 0; i < listaNotas.length; i++) {
    if (listaNotas[i].id === id) {
      if (listaNotas[i].realizada) {
        listaNotas[i].realizada = false;
      } else {
        listaNotas[i].realizada = true;
      }
    }
  }
  console.log(listaNotas);
}

let Titulo = document.getElementById('nota-titulo');
let Contenido = document.getElementById('nota-contenido');
let botonCrearNota = document.getElementById('crearNota');
let botonLimpiar = document.getElementById('limpiar');
let contenedorNotas = document.getElementById('listaNotas');

function borrarNota(id) {
  for (let i = 0; i < listaNotas.length; i++) {
    if (listaNotas[i].id === id) {
      listaNotas.splice(i, 1);
    }
  }
  contenedorNotas.innerHTML = '';
  pintarNotas(listaNotas);
}

botonLimpiar.addEventListener('click', () => {
  Titulo.value = '';
  Contenido.value = '';
});


  contenedorNotas.innerHTML = '';
  pintarNotas(listaNotas);


botonCrearNota.addEventListener('click', () => {
  let titulo = Titulo.value.trim();
  let contenido = Contenido.value.trim();

  if (titulo && contenido) {
    let nuevaNota = {
      id: ++idGlobal,
      titulo: titulo,
      texto: contenido,
      realizada: false
    };
    listaNotas.push(nuevaNota);
  } contenedorNotas.innerHTML = '';
  pintarNotas(listaNotas);
  Titulo.value = '';
  Contenido.value = '';
  
});


/* const contenedorNotas = document.getElementById('listaNotas');

function crearNotaHTML(nota) {
  let estiloTachado = nota.realizada ? 'text-decoration: line-through;' : ''; 
  const templateHTML = `
    <div class="nota">
      <input type="checkbox" class="realizada" ${nota.realizada ? 'checked' : ''}><h3>${nota.titulo}</h3>
      <p>${nota.texto}</p>
      <button class="eliminar" onclick="borrarNota(${nota.id})">Borrar nota</button>
    </div>
  `;
  const divNota = document.createElement('div');
  divNota.innerHTML = templateHTML;

  return divNota;
}
listaNotas.forEach(nota => {
  const divNota = crearNotaHTML(nota);
  contenedorNotas.appendChild(divNota);
});

const botonCrearNota = document.getElementById('crearNota');
const inputTitulo = document.getElementById('nota-titulo');
const textareaContenido = document.getElementById('nota-contenido');

botonCrearNota.addEventListener('click', () => {
  const titulo = inputTitulo.value;
  const contenido = textareaContenido.value;

  if (titulo && contenido) {
    const nuevaNota = {
      id: ++idGlobal,
      titulo,
      contenido,
      realizada: false
    };

    listaNotas.push(nuevaNota);

    const divNota = crearNotaHTML(nuevaNota);
    contenedorNotas.appendChild(divNota);

   
    inputTitulo.value = '';
    textareaContenido.value = '';
  } else {
    alert('Debes completar el título y el contenido de la nota');
  }
});

const botonLimpiar = document.getElementById('limpiar');

botonLimpiar.addEventListener('click', () => {
  const botonLimpiar = document.getElementById('limpiar');

botonLimpiar.addEventListener('click', () => {
  inputTitulo.value = '';
  textareaContenido.value = '';
});

});

function pintarNotas() {
  contenedorNotas.innerHTML = '';

  if (listaNotas.length === 0) {
    let mensajeSinNotas = document.createElement('p');
    mensajeSinNotas.textContent = 'NO HAY NOTAS PARA MOSTRAR';
    contenedorNotas.appendChild(mensajeSinNotas);
  } else {
    listaNotas.forEach(nota => {
      let divNota = crearNotaHTML(nota);
      contenedorNotas.appendChild(divNota);
    });
  }
}

function borrarNota(id) {
  const indiceNota = listaNotas.findIndex(nota => nota.id === id);

  if (indiceNota !== -1) {
    listaNotas.splice(indiceNota, 1);

    pintarNotas();
  } else {
    console.error('Nota con ID no encontrada:', id);
  }
};
function marcarRealizada(id) {
  const indiceNota = listaNotas.findIndex(nota => nota.id === id);

  if (indiceNota !== -1) {
    listaNotas[indiceNota].realizada = !listaNotas[indiceNota].realizada; // Invertir el valor de 'realizada'
    pintarNotas();
  } else {
    console.error('Nota con ID no encontrada:', id);
  }
}

pintarNotas();


 */