// Function that determines the agent's action based on its location and the state of that location
function reflex_agent(location, state) {
    if (state === "dirty") {
        return "clean";
    } else if (location === "a") {
        return "go_right";
    } else if (location === "b") {
        return "go_left";
    }
}

// Function that simulates the agent's behavior over multiple steps
function run_simulation(states, remainingSteps) {
    if (remainingSteps <= 0) {
        document.getElementById("log").innerHTML += `<br>Simulation successfully completed.`;
        return;
    }

    // Determine the agent's current location and state
    var currentLocation = states[0];
    var currentState = currentLocation === "a" ? states[1] : states[2];

    // Get the action to be performed by the agent
    var action = reflex_agent(currentLocation, currentState);

    // Log the location, state, and action
    document.getElementById("log").innerHTML += `<br>Location: ${currentLocation} | State: ${currentState} | Action: ${action}`;

    // Update the system state based on the agent's action
    if (action === "clean") {
        if (currentLocation === "a") {
            states[1] = "clean";
        } else if (currentLocation === "b") {
            states[2] = "clean";
        }
    } else if (action === "go_right") {
        states[0] = "b";
    } else if (action === "go_left") {
        states[0] = "a";
    }

    // Call the function again after 1 second, reducing the remaining steps
    setTimeout(function() {
        run_simulation(states, remainingSteps - 1);
    }, 1000);
}

// Initial system state: location and cleanliness state of each point
var initialStates = ["a", "dirty", "dirty"];
var totalSteps = 16;

// Start the simulation with the initial states and the number of steps
run_simulation(initialStates, totalSteps);
