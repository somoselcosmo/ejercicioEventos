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

let busqueda = document.getElementById('busqueda');

function buscarNota() {
  let textoBusqueda = busqueda.value.trim().toLowerCase();
  let notasFiltradas = [];

  for (let i = 0; i < listaNotas.length; i++) {
    if (listaNotas[i].titulo.toLowerCase().includes(textoBusqueda) || listaNotas[i].texto.toLowerCase().includes(textoBusqueda)) {
      notasFiltradas.push(listaNotas[i]);
    }
  }

  pintarNotas(notasFiltradas);
}

busqueda.addEventListener('input', notasFiltradas);
