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
    return 'bajo Peso';
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

// Tasas de cambio predeterminadas
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

// Función para convertir la moneda
const convertCurrency = () => {
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const amount = parseFloat(document.getElementById('amount').value);

  if (isNaN(amount) || amount <= 0) {
    document.getElementById('convertedAmount').textContent = 'Invalid amount';
    return;
  }

  const conversionRate = exchangeRates[fromCurrency][toCurrency];
  const convertedAmount = (amount * conversionRate).toFixed(2);
  document.getElementById('convertedAmount').textContent = convertedAmount;
};

// Agregar eventos a los campos de entrada
document.getElementById('fromCurrency').addEventListener('change', convertCurrency);
document.getElementById('toCurrency').addEventListener('change', convertCurrency);
document.getElementById('amount').addEventListener('input', convertCurrency);

// Llamar a la función de conversión inicial
convertCurrency();