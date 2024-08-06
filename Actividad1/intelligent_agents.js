// Función del agente reflexivo
function reflex_agent(location, state) {
    if (state == "sucia") return "CLEAN";
    else if (location == "A") return "RIGHT";
    else if (location == "B") return "LEFT";
}

// Función de simulación
function test(states) {
    var location = states[0];
    var state = states[0] == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);

    document.getElementById("log").innerHTML += `<br>Location: ${location} | Action: ${action_result}`;

    if (action_result == "CLEAN") {
        if (location == "A") states[1] = "limpia";
        else if (location == "B") states[2] = "limpia";
    } else if (action_result == "RIGHT") states[0] = "B";
    else if (action_result == "LEFT") states[0] = "A";

    // Ensuciar aleatoriamente las habitaciones
    ensuciarAleatoriamente();

    // Verificar si todas las habitaciones están limpias
    if (todosLimpios()) {
        document.getElementById("log").innerHTML += "<br>Todas las habitaciones están limpias. Deteniendo el programa.";
        return; // Detener la simulación
    }

    setTimeout(function () { test(states); }, 2000);
}

// Función para ensuciar aleatoriamente una habitación
function ensuciarAleatoriamente() {
    let habitacion = habitaciones[Math.floor(Math.random() * habitaciones.length)];
    habitacion.limpieza = "sucia";
    document.getElementById("log").innerHTML += `<br>Habitación ${habitacion.id} ensuciada.`;
}

// Función para verificar si todas las habitaciones están limpias
function todosLimpios() {
    return habitaciones.every(hab => hab.limpieza === "limpia");
}

// Estado inicial de las habitaciones
let habitaciones = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    limpieza: "sucia",
    ubicacion: (i % 2 === 0) ? "A" : "B" // Alterna entre A y B
}));

var states = ["A", ...habitaciones.map(hab => hab.limpieza)];

// Iniciar la simulación
test(states);
