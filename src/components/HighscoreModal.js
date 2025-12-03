// Highscore Modal Component

export function showHighscoreModal() {
	let modal = document.getElementById("highscore-modal");
	let backdrop = document.getElementById("highscore-backdrop");
	
	if (!modal) {
		// Create backdrop
		backdrop = document.createElement("div");
		backdrop.id = "highscore-backdrop";
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
		
		backdrop.onclick = (e) => {
			e.stopPropagation();
			hideHighscoreModal();
		};
		
		// Create modal
		modal = document.createElement("div");
		modal.id = "highscore-modal";
		modal.className = "noselect";
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
			<h5>You got a personal best!</h5>
			<div style="display: flex; gap: 10px; margin-top: 20px;">
				<button class="btn btn-primary" style="flex: 1; font-size: 18px;" id="highscore-save-btn">Save score</button>
				<button class="btn btn-secondary" style="flex: 1; font-size: 18px;" id="highscore-close-btn">Close</button>
			</div>
		`;
		document.body.appendChild(modal);
		
		// Prevent clicks on modal from propagating
		modal.onclick = (e) => {
			e.stopPropagation();
		};
		
		// Setup close button handler
		const closeBtn = document.getElementById("highscore-close-btn");
		if (closeBtn) {
			closeBtn.onclick = () => {
				hideHighscoreModal();
			};
		}
		
		// Setup save button handler
		const saveBtn = document.getElementById("highscore-save-btn");
		if (saveBtn) {
			saveBtn.onclick = () => {
				if (window.saveData && localStorage.username) {
					window.saveData(localStorage.username, null, "POST", true);
				}
			};
		}
	}
	
	// Get elements (they exist now)
	modal = document.getElementById("highscore-modal");
	backdrop = document.getElementById("highscore-backdrop");
	
	// Disable canMan when showing modal
	if (window.canMan !== undefined) {
		window.canMan = false;
	}
	
	// Show modal
	if (backdrop) backdrop.style.display = "block";
	if (modal) modal.style.display = "block";
}

export function hideHighscoreModal() {
	const modal = document.getElementById("highscore-modal");
	const backdrop = document.getElementById("highscore-backdrop");
	
	if (modal) {
		modal.style.display = "none";
	}
	if (backdrop) {
		backdrop.style.display = "none";
	}
	
	// Restore canMan
	if (window.canMan !== undefined) {
		window.canMan = true;
	}
}
