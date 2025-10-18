import { DIMS_OBJ } from "../data/dims.js";

export function createCustomDialog(onConfirm, cube, original) {
    console.log("original is ", original)
    let modal = document.getElementById("custom-dialog");
    let backdrop = document.getElementById("custom-dialog-backdrop");

    let scrambleOptions = ["Default", "3x3x2", "Double Turns"];
    let inputOptions = ["Default", "3x3x2", "Double Turns"];
    let winConditionOptions = ["Default", "Solve 1 Side"]; 

    if (DIMS_OBJ[cube].type.includes("NxN")) {
        scrambleOptions.push("Gearcube");
        scrambleOptions.push("Last Layer")
        inputOptions.push("Gearcube");
    }

    if (!modal) {
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

        modal.innerHTML = `
            <h4>Select Custom Values</h4>

            <label for="dialog-select-2" style="display: block; margin-bottom: 5px; font-weight: bold;">Input</label>
            <select id="dialog-select-2" style="width: 100%; margin-bottom: 20px;"></select>
            
            <label for="dialog-select-1" style="display: block; margin-bottom: 5px; font-weight: bold;">Scramble</label>
            <select id="dialog-select-1" style="width: 100%; margin-bottom: 15px;"></select>

            <label for="dialog-select-3" style="display: block; margin-bottom: 5px; font-weight: bold;">Win Condition</label>
            <select id="dialog-select-3" style="width: 100%; margin-bottom: 20px;"></select>
            
            <div style="display: flex; justify-content: space-between;">
                <button id="dialog-ok-btn" class="btn btn-primary" style="flex: 1; margin-right: 5px;">OK</button>
                <button id="dialog-cancel-btn" class="btn btn-secondary" style="flex: 1;">Cancel</button>
            </div>
        `;
        document.body.appendChild(modal);
        backdrop = document.createElement("div");
        backdrop.id = "custom-dialog-backdrop";
        Object.assign(backdrop.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)", 
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
    customScramble.value = original.scramble;
    const customInput = document.getElementById("dialog-select-2");
    customInput.value = original.input;
    const customWinCondition = document.getElementById("dialog-select-3"); 
    customWinCondition.value = original.winCondition;
    

    if (customScramble.children.length === 0) {
        scrambleOptions.forEach(opt => {
            customScramble.appendChild(new Option(opt, opt));
        });
    }

    if (customInput.children.length === 0) {
        inputOptions.forEach(opt => {
            customInput.appendChild(new Option(opt, opt));
        });
    }

    if (customWinCondition.children.length === 0) {
        winConditionOptions.forEach(opt => {
            customWinCondition.appendChild(new Option(opt, opt));
        });
    }


    customInput.addEventListener('change', () => {
        customScramble.value = customInput.value;
    });

    customScramble.addEventListener('change', () => {
        if (customInput.value != customScramble.value) {
            customInput.value = "Default";
        }
    });

    okBtn.onclick = () => {
        const value1 = customScramble.value;
        const value2 = customInput.value;
        const value3 = customWinCondition.value; 
        
        modal.style.display = "none";
        backdrop.style.display = "none"; // HIDE BACKDROP
        
        const customobj = {
            scramble: value1,
            input: value2,
            winCondition: value3 
        };
        
        if (onConfirm) {
            onConfirm(JSON.stringify(customobj));
        }
    };

    cancelBtn.onclick = () => {
        modal.style.display = "none";
        backdrop.style.display = "none";
    };

    backdrop.style.display = "block";

    return modal;
}