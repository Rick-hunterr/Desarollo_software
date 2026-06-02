const preguntas = [
    {
        pregunta: "¿Quién es considerada la primera programadora de la historia?",
        opciones: ["Marie Curie", "Ada Lovelace", "Grace Hopper", "Margaret Hamilton"],
        respuestaCorrecta: 1 
    },
    {
        pregunta: "¿Qué significa la sigla SDLC en desarrollo de software?",
        opciones: ["Sistema de Datos Lógicos", "Software de Descarga Libre", "Ciclo de Vida del Desarrollo de Sistemas"],
        respuestaCorrecta: 2
    },
    {
        pregunta: "Para evitar vulnerabilidades, al declarar variables en herramientas estrictas de pseudocódigo se debe:",
        opciones: ["Hacerlo de forma automática.", "Definirlas explícitamente y respetar la sintaxis.", "Ignorarlas hasta el final del proceso."],
        respuestaCorrecta: 1
    },
    {
        pregunta: "¿Qué enfoque moderno integra la seguridad desde el inicio del desarrollo?",
        opciones: ["Waterfall (Cascada)", "DevSecOps", "Frontend"],
        respuestaCorrecta: 1
    },
    {
        pregunta: "Según las normativas recientes de IA (como las de California y Colorado), los desarrolladores deben:",
        opciones: ["Escribir el código en un solo idioma.", "Integrar transparencia, marcas de agua y evaluaciones.", "Dejar de usar la nube."],
        respuestaCorrecta: 1
    },
    {
        pregunta: "¿Qué inventó Grace Hopper que revolucionó la programación?",
        opciones: ["El primer mouse", "El primer compilador", "El disco duro"],
        respuestaCorrecta: 1
    },
    {
        pregunta: "¿Qué es la 'IA Agéntica' en el desarrollo de software actual?",
        opciones: ["IA que actúa como agente autónomo resolviendo código.", "Un nuevo lenguaje de diseño visual.", "Una empresa de ciberseguridad."],
        respuestaCorrecta: 0
    },
    {
        pregunta: "En la actualidad, gran parte del software empresarial se ejecuta en:",
        opciones: ["Cintas magnéticas.", "La nube (Cloud Computing).", "Disqueteras."],
        respuestaCorrecta: 1
    },
    {
        pregunta: "¿Cuál es uno de los mayores dilemas éticos actuales del desarrollo de software?",
        opciones: ["La elección del color de la interfaz.", "La privacidad de los datos y responsabilidad de algoritmos.", "La velocidad del internet."],
        respuestaCorrecta: 1
    },
    {
        pregunta: "¿Cuál de estas metodologías de trabajo es conocida por ser rápida, flexible y continua?",
        opciones: ["Metodología Ágil", "Modelo Lineal en Cascada", "Desarrollo Analógico"],
        respuestaCorrecta: 0
    }
];

let preguntaActualIndex = 0;
let puntuacion = 0;

const elementoPregunta = document.getElementById('pregunta');
const contenedorOpciones = document.getElementById('opciones');
const botonSiguiente = document.getElementById('siguiente-btn');
const contenedorQuiz = document.getElementById('quiz-container');
const contenedorPuntuacion = document.getElementById('puntuacion-container');
const textoPuntuacion = document.getElementById('puntuacion-final');
const botonReiniciar = document.getElementById('reiniciar-btn');
const mensajeResultado = document.getElementById('mensaje-resultado');

function cargarPregunta() {
    contenedorOpciones.innerHTML = '';
    mensajeResultado.textContent = '';
    botonSiguiente.style.display = 'none';

    const preguntaActual = preguntas[preguntaActualIndex];
    elementoPregunta.textContent = preguntaActual.pregunta;

    preguntaActual.opciones.forEach((opcion, index) => {
        const boton = document.createElement('button');
        boton.textContent = opcion;
        boton.classList.add('btn-opcion');
        
        boton.addEventListener('click', () => seleccionarRespuesta(index, boton));
        
        contenedorOpciones.appendChild(boton);
    });
}

function seleccionarRespuesta(indexSeleccionado, botonPresionado) {
    const preguntaActual = preguntas[preguntaActualIndex];
    const botones = contenedorOpciones.querySelectorAll('.btn-opcion');

    botones.forEach(btn => btn.disabled = true);

    if (indexSeleccionado === preguntaActual.respuestaCorrecta) {
        botonPresionado.classList.add('correcta');
        mensajeResultado.textContent = "¡Correcto! ";
        mensajeResultado.style.color = "#2ecc71";
        puntuacion++;
    } else {
        botonPresionado.classList.add('incorrecta');
        mensajeResultado.textContent = "Incorrecto!";
        mensajeResultado.style.color = "#e74c3c";
        // Pintar de verde la que era correcta
        botones[preguntaActual.respuestaCorrecta].classList.add('correcta');
    }

    botonSiguiente.style.display = 'block';
}

botonSiguiente.addEventListener('click', () => {
    preguntaActualIndex++;
    
    if (preguntaActualIndex < preguntas.length) {
        cargarPregunta();
    } else {
        mostrarResultados();
    }
});

// Función para mostrar pantalla final
function mostrarResultados() {
    contenedorQuiz.style.display = 'none';
    contenedorPuntuacion.style.display = 'block';
    textoPuntuacion.textContent = `Acertaste ${puntuacion} de ${preguntas.length} preguntas.`;
}

botonReiniciar.addEventListener('click', () => {
    preguntaActualIndex = 0;
    puntuacion = 0;
    contenedorQuiz.style.display = 'block';
    contenedorPuntuacion.style.display = 'none';
    cargarPregunta();
});

cargarPregunta();