import { DIMS_OBJ } from "../data/dims.js";

export function createCustomDialog(onConfirm, cube) {
    let modal = document.getElementById("custom-dialog");
    let backdrop = document.getElementById("custom-dialog-backdrop");

    // Define the required static options
    let inputOptions = ["Default", "3x3x2", "Double Turns"];
    let scrambleOptions = ["Default", "3x3x2", "Double Turns"];

    if (DIMS_OBJ[cube].type.includes("NxN")) {
        inputOptions.push("Gearcube");
        scrambleOptions.push("Gearcube");
    }

    // Create the modal and backdrop only if they don't exist
    if (!modal) {
        // --- Modal Creation (Existing Logic) ---
        modal = document.createElement("div");
        modal.id = "custom-dialog";
        Object.assign(modal.style, {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 15px rgba(0,0,0,0.3)",
            zIndex: "9999",
            display: "none",
            minWidth: "300px",
            textAlign: "center"
        });

        // Create all child elements once
        modal.innerHTML = `
            <h4>Select Custom Values</h4>
            <label for="dialog-select-2" style="display: block; margin-bottom: 5px; font-weight: bold;">Input</label>
            <select id="dialog-select-2" style="width: 100%; margin-bottom: 20px;"></select>
            <label for="dialog-select-1" style="display: block; margin-bottom: 5px; font-weight: bold;">Scramble</label>
            <select id="dialog-select-1" style="width: 100%; margin-bottom: 15px;"></select>
            <div style="display: flex; justify-content: space-between;">
                <button id="dialog-ok-btn" class="btn btn-primary" style="flex: 1; margin-right: 5px;">OK</button>
                <button id="dialog-cancel-btn" class="btn btn-secondary" style="flex: 1;">Cancel</button>
            </div>
        `;
        document.body.appendChild(modal);

        // --- Backdrop Creation (UPDATED for dimming) ---
        backdrop = document.createElement("div");
        backdrop.id = "custom-dialog-backdrop";
        Object.assign(backdrop.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            // CHANGE: Use a dark, highly transparent background color for dimming
            backgroundColor: "rgba(0, 0, 0, 0.7)", 
            // REMOVED: backdrop-filter and WebkitBackdropFilter
            zIndex: "9998",
            display: "none"
        });
        document.body.appendChild(backdrop);
    }

    if (!backdrop) backdrop = document.getElementById("custom-dialog-backdrop");

    // Get references to the elements
    const okBtn = document.getElementById("dialog-ok-btn");
    const cancelBtn = document.getElementById("dialog-cancel-btn");
    const customScramble = document.getElementById("dialog-select-1");
    const customInput = document.getElementById("dialog-select-2");

    // Populate the select boxes with the required static options
    customScramble.innerHTML = '';
    customInput.innerHTML = '';
    inputOptions.forEach(opt => {
        customScramble.appendChild(new Option(opt, opt));
    });

    scrambleOptions.forEach(opt => {
        customInput.appendChild(new Option(opt, opt));
    });

    customInput.addEventListener('change', () => {
        customScramble.value = customInput.value;
    });

    customScramble.addEventListener('change', () => {
        if (customInput.value != customScramble.value) {
            customInput.value = "Default";
        }
    });

    // Assign event handlers, ensuring backdrop is hidden on close
    okBtn.onclick = () => {
        const value1 = customScramble.value;
        const value2 = customInput.value;
        modal.style.display = "none";
        backdrop.style.display = "none"; // HIDE BACKDROP
        const customobj = {
            scramble: value1,
            input: value2
        };
        if (onConfirm) {
            onConfirm(JSON.stringify(customobj));
        }
    };

    cancelBtn.onclick = () => {
        modal.style.display = "none";
        backdrop.style.display = "none"; // HIDE BACKDROP
    };

    // Show the backdrop immediately before returning
    backdrop.style.display = "block";

    return modal;
}