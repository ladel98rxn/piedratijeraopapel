// Capturar elementos del DOM
let botonPiedra = document.querySelector(".piedra");
let botonPapel = document.querySelector(".papel");
let botonTijera = document.querySelector(".tijera");
let manoUsuario = document.querySelector(".mano-usuario");
let manoComputador = document.querySelector(".mano-computador");
let puntajeUsuario = document.querySelector(".puntaje-usuario p");
let puntajeComputador = document.querySelector(".puntaje-computador p");
let labelResultado = document.querySelector(".resultado");
let tablero = document.querySelector(".tablero");

// Variables para seguimiento de puntaje
let conUsuario = 0;
let conComputador = 0;

// Función para elección aleatoria de la computadora
const eleccionCompu = () => {
    let opcionAlAzar = Math.floor(Math.random() * 3);

    if (opcionAlAzar === 0) {
        manoComputador.src = "assets/piedra_computadora.png";
        return "piedra";
    } else if (opcionAlAzar === 1) {
        manoComputador.src = "assets/papel_computadora.png";
        return "papel";
    } else {
        manoComputador.src = "assets/tijera_computadora.png";
        return "tijera";
    }
};

// Función para determinar el resultado del juego
const resultado = (eleccionUsuario, eleccionComputadora) => {
    if (eleccionUsuario === eleccionComputadora) {
        return "Empate";
    } else if (
        (eleccionUsuario === "piedra" && eleccionComputadora === "tijera") ||
        (eleccionUsuario === "papel" && eleccionComputadora === "piedra") ||
        (eleccionUsuario === "tijera" && eleccionComputadora === "papel")
    ) {
        return "Tú ganas";
    } else {
        return "La computadora gana";
    }
};

// Función para actualizar el puntaje y verificar el ganador
const actualizarPuntaje = (resultado) => {
    if (resultado === "Tú ganas") {
        conUsuario++;
    } else if (resultado === "La computadora gana") {
        conComputador++;
    }
    puntajeUsuario.textContent = conUsuario;
    puntajeComputador.textContent = conComputador;

    if (conUsuario >= 3 || conComputador >= 3) {
        setTimeout(mostrarGanador, 1000);
    }
};

// Función para mostrar mensaje de inicio
const mostrarInicio = () => {
    Swal.fire("¡Bienvenido al juego!", "Selecciona una opción para empezar.", "info");
};

// Función para mostrar al ganador
const mostrarGanador = () => {
    if (conUsuario > conComputador) {
        Swal.fire("¡Tú eres el ganador!", "", "success");
    } else if (conComputador > conUsuario) {
        Swal.fire("La computadora es el ganador.", "", "error");
    } else {
        Swal.fire("¡Empate!", "", "info");
    }

    // Restablecer el puntaje y las imágenes
    conUsuario = 0;
    conComputador = 0;
    puntajeUsuario.textContent = conUsuario;
    puntajeComputador.textContent = conComputador;
    manoUsuario.src = "";
    manoComputador.src = "";
    labelResultado.textContent = "Seleccione una opción";
};

// Función para manejar la selección del usuario
const seleccionUsuario = (eleccion) => {
    manoUsuario.src = `assets/${eleccion}_user.png`;
    labelResultado.textContent = "...";
    tablero.classList.add("jugando");
    setTimeout(() => {
        eleccionUsuario = eleccion;
        manoUsuario.src = `assets/${eleccion}_user.png`;
        let eleccionComputadora = eleccionCompu();
        let res = resultado(eleccionUsuario, eleccionComputadora);
        labelResultado.textContent = res;
        actualizarPuntaje(res);
        tablero.classList.remove("jugando");
    }, 2000);
};

// Evento click para botón "Piedra"
botonPiedra.onclick = () => {
    seleccionUsuario("piedra");
};

// Evento click para botón "Papel"
botonPapel.onclick = () => {
    seleccionUsuario("papel");
};

// Evento click para botón "Tijera"
botonTijera.onclick = () => {
    seleccionUsuario("tijera");
};

// Mostrar mensaje de inicio al cargar la página
mostrarInicio();
