import { DIMS_OBJ } from "../data/dims.js";

export function createCustomDialog(onConfirm, cube, original, is1v1mode) {
    console.log(is1v1mode)
    let modal = document.getElementById("custom-dialog");
    let backdrop = document.getElementById("custom-dialog-backdrop");

    let scrambleOptions = ["Default", "3x3x2", "Double Turns"];
    let inputOptions = ["Default", "3x3x2", "Double Turns"];
    let goalOptions = ["Default", "Solve 1 Side"];

    if (DIMS_OBJ[cube].type.includes("NxN")) {
        scrambleOptions.push("Gearcube", "Last Layer");
        inputOptions.push("Gearcube");
    }

    if (["3x3", "Xmas 3x3"].includes(cube)) {
        scrambleOptions.push("Preserve Cross");
    }

    if (DIMS_OBJ[cube].type.includes("Shapeshift")) {
        goalOptions.push("Make Cubic Shape");
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
            textAlign: "center",
            color: "black",
        });

        modal.innerHTML = `
            <h4>Select Custom Values</h4>

            <div style="margin-bottom: 20px;">
                <label style="display: block; font-weight: bold; margin-bottom: 5px;">Input</label>
                <div id="dialog-buttons-2" class="button-group"></div>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display: block; font-weight: bold; margin-bottom: 5px;">Scramble</label>
                <div id="dialog-buttons-1" class="button-group"></div>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display: block; font-weight: bold; margin-bottom: 5px;">Win Condition</label>
                <div id="dialog-buttons-3" class="button-group"></div>
            </div>

            <div style="display: flex; justify-content: space-between;">
                <button id="dialog-ok-btn" class="btn btn-primary" style="flex: 1; margin-right: 5px;">Apply</button>
                <button id="dialog-applyall-btn" class="btn btn-primary" style="flex: 1; margin-right: 5px;">Apply to both players</button>
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

        // Button styling
        const style = document.createElement("style");
        style.textContent = `
            .button-group button {
                margin: 3px;
                padding: 6px 10px;
                border: 1px solid #ccc;
                background: #f9f9f9;
                cursor: pointer;
                border-radius: 4px;
            }
            .button-group button.selected {
                background: #007bff;
                color: white;
                border-color: #007bff;
            }
        `;
        document.head.appendChild(style);
    }

    if (!backdrop) backdrop = document.getElementById("custom-dialog-backdrop");

    const okBtn = document.getElementById("dialog-ok-btn");
    let applyAllBtn = document.getElementById("dialog-applyall-btn");;
    applyAllBtn.style.display = is1v1mode ? "block" : "none";
    const cancelBtn = document.getElementById("dialog-cancel-btn");

    const scrambleContainer = document.getElementById("dialog-buttons-1");
    const inputContainer = document.getElementById("dialog-buttons-2");
    const goalContainer = document.getElementById("dialog-buttons-3");

    scrambleContainer.innerHTML = "";
    inputContainer.innerHTML = "";
    goalContainer.innerHTML = "";

    function makeButtonGroup(container, options, selectedValue, onClick) {
        options.forEach(opt => {
            const btn = document.createElement("button");
            btn.textContent = opt;
            if (opt === selectedValue) btn.classList.add("selected");

            btn.onclick = () => {
                [...container.children].forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (onClick) onClick(opt); // pass the clicked value
            };

            container.appendChild(btn);
        });
    }

    // Input buttons
    makeButtonGroup(inputContainer, inputOptions, original.input, (val) => {
        // if input changes, set scramble to match
        const scrambleBtn = [...scrambleContainer.children].find(b => b.textContent === val);
        if (scrambleBtn) {
            [...scrambleContainer.children].forEach(b => b.classList.remove("selected"));
            scrambleBtn.classList.add("selected");
        }
    });

    // Scramble buttons
    makeButtonGroup(scrambleContainer, scrambleOptions, original.scramble, (val) => {
        const inputSelected = inputContainer.querySelector(".selected")?.textContent;
        if (inputSelected !== val) {
            // reset input to Default if mismatch
            [...inputContainer.children].forEach(b => b.classList.remove("selected"));
            const defaultBtn = [...inputContainer.children].find(b => b.textContent === "Default");
            if (defaultBtn) defaultBtn.classList.add("selected");
        }
    });

    makeButtonGroup(goalContainer, goalOptions, original.goal);

    function confirm(applyOpponent) {
        const value1 = scrambleContainer.querySelector(".selected")?.textContent || "Default";
        const value2 = inputContainer.querySelector(".selected")?.textContent || "Default";
        const value3 = goalContainer.querySelector(".selected")?.textContent || "Default";

        modal.style.display = "none";
        backdrop.style.display = "none";

        const customobj = { scramble: value1, input: value2, goal: value3 };
        if (onConfirm) onConfirm(JSON.stringify(customobj), applyOpponent);
    };

    okBtn.onclick = () => confirm(false);
    if (applyAllBtn)  applyAllBtn.onclick = () => confirm(true);




    cancelBtn.onclick = () => {
        modal.style.display = "none";
        backdrop.style.display = "none";
    };

    backdrop.style.display = "block";
    modal.style.display = "block";

    return modal;
}
