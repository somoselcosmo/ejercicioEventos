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

let idGlobal = listaNotas.reduce((maxId, nota) => Math.max(maxId, nota.id), 0);

document.getElementById('filtroRealizado').addEventListener('change', function() {
  let texto = document.getElementById('filtroTexto').value;
  let notasFiltradas = filtrarNotasPorTexto(listaNotas, texto);
  agregarNotas(notasFiltradas, this.checked);
  let contenedorNotas = document.getElementById('listaNotas');
  contenedorNotas.innerHTML = '';

  let notasAMostrar = this.checked ? listaNotas.filter(nota => nota.realizada) : listaNotas;
  
  notasAMostrar.forEach(nota => {
    const tarjetaNota = document.createElement('div');
    tarjetaNota.classList.add('tarjeta-nota');
    const checkboxRealizada = document.createElement('input');
    checkboxRealizada.type = 'checkbox';
    checkboxRealizada.checked = nota.realizada;
    checkboxRealizada.addEventListener('change', function() {
      nota.realizada = this.checked;
      agregarNotas();
    });
    tarjetaNota.appendChild(checkboxRealizada);
    const tituloNota = document.createElement('h3');
    tituloNota.textContent = nota.titulo;
    tarjetaNota.appendChild(tituloNota);
    const textoNota = document.createElement('p');
    textoNota.textContent = nota.texto;
    tarjetaNota.appendChild(textoNota);
    contenedorNotas.appendChild(tarjetaNota);
  
    let botonBorrar = document.createElement('button');
    botonBorrar.textContent = 'Borrar nota';
    botonBorrar.classList.add('boton-borrar');
    botonBorrar.setAttribute('onclick', `borrarNota(${nota.id})`);
    tarjetaNota.appendChild(botonBorrar);
      
    contenedorNotas.appendChild(tarjetaNota);
  });
});

function agregarNota(titulo, texto) {
  idGlobal++;
  const nuevaNota = {
    id: idGlobal,
    titulo: titulo,
    texto: texto,
    realizada: false
  };
  listaNotas.push(nuevaNota);
  agregarNotas();
};

function filtrarNotasPorTexto(notas, texto) {
  if (!texto) {
    return notas;
  }
  const textoBusqueda = texto.toLowerCase();
  return notas.filter(nota => 
    nota.titulo.toLowerCase().includes(textoBusqueda) || 
    nota.texto.toLowerCase().includes(textoBusqueda)
  );
};

document.getElementById('filtroTexto').addEventListener('input', function() {
  const texto = this.value;
  const notasFiltradas = filtrarNotasPorTexto(listaNotas, texto);
  agregarNotas(notasFiltradas);
});

function agregarNotas() { 
  const contenedorNotas = document.getElementById('listaNotas');
  contenedorNotas.innerHTML = '';
  let filtroRealizadoActivado = document.getElementById('filtroRealizado').checked;
  let texto = document.getElementById('filtroTexto').value;
  let notasFiltradas = filtrarNotasPorTexto(listaNotas, texto);
  let notasAMostrar = filtroRealizadoActivado ? notasFiltradas.filter(nota => nota.realizada) : notasFiltradas;

  if (notasAMostrar.length === 0) {
    let mensajeVacio = document.createElement('p');
    mensajeVacio.textContent = 'NO HAY NOTAS PARA MOSTRAR';
    mensajeVacio.classList.add('mensaje-vacio');
    contenedorNotas.appendChild(mensajeVacio);
  } else {
    notasAMostrar.forEach(nota => {
      const tarjetaNota = document.createElement('div');
      tarjetaNota.classList.add('tarjeta-nota');

      const checkboxRealizada = document.createElement('input');
      checkboxRealizada.setAttribute('type', 'checkbox');
      checkboxRealizada.classList.add('realizada');
      checkboxRealizada.id = 'realizada-' + nota.id;
      checkboxRealizada.checked = nota.realizada;
      checkboxRealizada.setAttribute('onclick', `marcarRealizada(${nota.id})`);
      tarjetaNota.appendChild(checkboxRealizada);

      const labelRealizada = document.createElement('label');
      labelRealizada.setAttribute('for', 'realizada-' + nota.id);
      labelRealizada.textContent = 'Marcar como realizada';
      tarjetaNota.appendChild(labelRealizada);

      const tituloNota = document.createElement('h3');
      tituloNota.textContent = nota.titulo;
      tarjetaNota.appendChild(tituloNota);
  
      const textoNota = document.createElement('p');
      textoNota.textContent = nota.texto;
      textoNota.style.textDecoration = nota.realizada ? 'line-through' : 'none';
      tarjetaNota.appendChild(textoNota);
  
      let botonBorrar = document.createElement('button');
      botonBorrar.textContent = 'Borrar nota';
      botonBorrar.classList.add('boton-borrar');
      botonBorrar.setAttribute('onclick', `borrarNota(${nota.id})`);
      tarjetaNota.appendChild(botonBorrar);
      
      contenedorNotas.appendChild(tarjetaNota);
    });
  }
}
function marcarRealizada(id) {
  for (let i = 0; i < listaNotas.length; i++) {
    if (listaNotas[i].id === id) {
      listaNotas[i].realizada = !listaNotas[i].realizada;
      break;
    }
  }
  agregarNotas(); 
}
function borrarNota(idNota) {
  listaNotas = listaNotas.filter(nota => nota.id !== idNota);
  agregarNotas();
}

document.addEventListener('DOMContentLoaded', agregarNotas);

function crearNuevaNota() {
  const titulo = document.getElementById('nota-titulo').value;
  const texto = document.getElementById('nota-contenido').value;

  if (titulo.trim() === '' || texto.trim() === '') {
    alert('Por favor, complete todos los campos para crear una nota.');
    return;
  }

  agregarNota(titulo, texto);

  document.getElementById('nota-titulo').value = '';
  document.getElementById('nota-contenido').value = '';
  agregarNotas();
}

function limpiarCampos() {
  document.getElementById('nota-titulo').value = '';
  document.getElementById('nota-contenido').value = '';
}

document.getElementById('crearNota').addEventListener('click', crearNuevaNota);
document.getElementById('filtroTexto').addEventListener('input', agregarNotas);
document.getElementById('filtroRealizado').addEventListener('change', agregarNotas);
document.getElementById('limpiar').addEventListener('click', limpiarCampos);

document.getElementById('filtroRealizado').addEventListener('change', function() {
  let texto = document.getElementById('filtroTexto').value;
  let notasFiltradas = filtrarNotasPorTexto(listaNotas, texto);
  agregarNotas(notasFiltradas, this.checked);
});
