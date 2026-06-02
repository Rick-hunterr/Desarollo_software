/* ============================================================
   script.js — Desarrollo de Software
   - QR: hover → popover (desktop); click/tap → modal full-screen
   - Modal: Esc cierra, foco gestionado, aria-hidden toggled
   - Quiz: carga preguntas en trivia.html
   ============================================================ */

'use strict';

// ── Preguntas de la trivia ────────────────────────────────────
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
        pregunta: "¿Cuál de estas metodologías es conocida por ser rápida, flexible y continua?",
        opciones: ["Metodología Ágil", "Modelo Lineal en Cascada", "Desarrollo Analógico"],
        respuestaCorrecta: 0
    }
];

document.addEventListener('DOMContentLoaded', () => {

    /* ══════════════════════════════════════════════════════════
       QR — POPOVER (hover, desktop) + MODAL (click/tap)
    ══════════════════════════════════════════════════════════ */

    const qrBtn        = document.getElementById('qr-btn');
    const qrPopover    = document.getElementById('qr-popover');
    const qrModal      = document.getElementById('qr-modal');
    const qrModalClose = document.getElementById('qr-modal-close');
    const qrModalUrl   = document.getElementById('qr-modal-url');
    const footerQrBtn  = document.getElementById('footer-qr-btn');

    // Detección táctil: en dispositivos táctiles desactivamos hover-popover
    const isTouch = () => window.matchMedia('(hover: none)').matches;

    // ── Modal helpers ─────────────────────────────────────────
    let previouslyFocused = null; // restore foco al cerrar

    function openModal() {
        if (!qrModal) return;
        previouslyFocused = document.activeElement;

        // Escribir URL actual en el modal (siempre fresca)
        if (qrModalUrl) { qrModalUrl.textContent = window.location.href; }

        // Ocultar popover de hover si estaba visible
        closePopover();

        qrModal.classList.add('open');
        qrModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // evitar scroll de fondo

        // Foco al botón cerrar
        if (qrModalClose) { qrModalClose.focus(); }

        // Marcar botón como expandido
        if (qrBtn) { qrBtn.setAttribute('aria-expanded', 'true'); }
    }

    function closeModal() {
        if (!qrModal) return;
        qrModal.classList.remove('open');
        qrModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        if (qrBtn) { qrBtn.setAttribute('aria-expanded', 'false'); }

        // Devolver el foco al elemento que lo tenía antes
        if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
            previouslyFocused.focus();
        }
    }

    // ── Popover helpers (desktop hover) ──────────────────────
    function showPopover() {
        if (!qrPopover || isTouch()) return;
        qrPopover.classList.add('show');
        qrPopover.setAttribute('aria-hidden', 'false');
    }

    function closePopover() {
        if (!qrPopover) return;
        qrPopover.classList.remove('show');
        qrPopover.setAttribute('aria-hidden', 'true');
    }

    // ── Botón principal QR (barra fija) ───────────────────────
    if (qrBtn) {
        // Click / tap → modal
        qrBtn.addEventListener('click', () => {
            if (qrModal && qrModal.classList.contains('open')) {
                closeModal();
            } else {
                openModal();
            }
        });

        // Hover solo en dispositivos con puntero preciso (desktop)
        qrBtn.addEventListener('mouseenter', () => { if (!isTouch()) showPopover(); });
        qrBtn.addEventListener('mouseleave', () => { if (!isTouch()) closePopover(); });

        // Teclado: Enter/Space ya los maneja el click nativo del botón
    }

    // Mantener popover abierto al pasar sobre él (sin cerrar al salir del btn)
    if (qrPopover) {
        qrPopover.addEventListener('mouseenter', () => { if (!isTouch()) showPopover(); });
        qrPopover.addEventListener('mouseleave', () => { if (!isTouch()) closePopover(); });
    }

    // ── Botón footer QR ───────────────────────────────────────
    if (footerQrBtn) {
        footerQrBtn.addEventListener('click', openModal);
    }

    // ── Botón cerrar modal ────────────────────────────────────
    if (qrModalClose) {
        qrModalClose.addEventListener('click', closeModal);
    }

    // ── Clic en el fondo del modal (fuera del inner) lo cierra ─
    if (qrModal) {
        qrModal.addEventListener('click', (e) => {
            if (e.target === qrModal) { closeModal(); }
        });
    }

    // ── Teclado global: Esc cierra modal ─────────────────────
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && qrModal && qrModal.classList.contains('open')) {
            closeModal();
        }
    });

    // ── Trampa de foco dentro del modal ──────────────────────
    // (tab cycle entre qr-modal-close y qr-modal-close ya que es el único focusable)
    if (qrModal) {
        qrModal.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;
            // Recopilar elementos focusables dentro del modal
            const focusable = Array.from(
                qrModal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                )
            ).filter(el => !el.disabled);
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last  = focusable[focusable.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) { e.preventDefault(); last.focus(); }
            } else {
                if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
            }
        });
    }

    /* ══════════════════════════════════════════════════════════
       TRIVIA — solo activa si existen los elementos en el DOM
    ══════════════════════════════════════════════════════════ */

    const elementoPregunta    = document.getElementById('pregunta');
    const contenedorOpciones  = document.getElementById('opciones');
    const botonSiguiente      = document.getElementById('siguiente-btn');
    const contenedorQuiz      = document.getElementById('quiz-container');
    const contenedorPuntuacion = document.getElementById('puntuacion-container');
    const textoPuntuacion     = document.getElementById('puntuacion-final');
    const botonReiniciar      = document.getElementById('reiniciar-btn');
    const mensajeResultado    = document.getElementById('mensaje-resultado');

    // Salir si no hay quiz en esta página
    if (!elementoPregunta || !contenedorOpciones) return;

    let preguntaActualIndex = 0;
    let puntuacion = 0;

    function cargarPregunta() {
        contenedorOpciones.innerHTML = '';
        if (mensajeResultado) { mensajeResultado.textContent = ''; }
        if (botonSiguiente)   { botonSiguiente.style.display = 'none'; }

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
        botones.forEach(btn => { btn.disabled = true; });

        if (indexSeleccionado === preguntaActual.respuestaCorrecta) {
            botonPresionado.classList.add('correcta');
            if (mensajeResultado) {
                mensajeResultado.textContent = '¡Correcto! ✓';
                mensajeResultado.style.color = '#2ecc71';
            }
            puntuacion++;
        } else {
            botonPresionado.classList.add('incorrecta');
            if (mensajeResultado) {
                mensajeResultado.textContent = 'Incorrecto ✗';
                mensajeResultado.style.color = '#e74c3c';
            }
            const correctoBtn = botones[preguntaActual.respuestaCorrecta];
            if (correctoBtn) { correctoBtn.classList.add('correcta'); }
        }

        if (botonSiguiente) { botonSiguiente.style.display = 'block'; }
    }

    if (botonSiguiente) {
        botonSiguiente.addEventListener('click', () => {
            preguntaActualIndex++;
            if (preguntaActualIndex < preguntas.length) {
                cargarPregunta();
            } else if (contenedorQuiz && contenedorPuntuacion && textoPuntuacion) {
                contenedorQuiz.style.display = 'none';
                contenedorPuntuacion.style.display = 'block';
                textoPuntuacion.textContent =
                    `Acertaste ${puntuacion} de ${preguntas.length} preguntas.`;
            }
        });
    }

    if (botonReiniciar) {
        botonReiniciar.addEventListener('click', () => {
            preguntaActualIndex = 0;
            puntuacion = 0;
            if (contenedorQuiz)      { contenedorQuiz.style.display = 'block'; }
            if (contenedorPuntuacion){ contenedorPuntuacion.style.display = 'none'; }
            cargarPregunta();
        });
    }

    cargarPregunta();
});
