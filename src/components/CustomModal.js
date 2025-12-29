// Custom Modal Component
import { modalManager } from './ModalManager.js';

export function showCustomModal(message, width = "300px") {
	let modal = document.getElementById("custom-modal");
	let backdrop = document.getElementById("custom-backdrop");
	
	if (!modal) {
		// Create backdrop
		backdrop = document.createElement("div");
		backdrop.id = "custom-backdrop";
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
			hideCustomModal();
		};
		
		// Create modal
		modal = document.createElement("div");
		modal.id = "custom-modal";
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
			width: "90%",
			maxWidth: width,
			boxSizing: "border-box",
			overflowWrap: "break-word",
			wordWrap: "break-word",
			textAlign: "center",
			color: "black",
		});
		
		document.body.appendChild(modal);
		
		// Prevent clicks on modal from propagating
		modal.onclick = (e) => {
			e.stopPropagation();
		};
	}
	
	// Update modal content with message
	modal.innerHTML = `
		<p style="margin: 15px 0; font-size: 16px;">
			${message}
		</p>
		<div style="display: flex; gap: 10px; margin-top: 20px;">
			<button class="btn btn-primary" style="flex: 1; font-size: 18px;" id="custom-ok-btn">OK</button>
		</div>
	`;
	
	// Setup OK button handler
	const okBtn = document.getElementById("custom-ok-btn");
	if (okBtn) {
		okBtn.onclick = () => {
			hideCustomModal();
		};
	}
	
	// Get elements (they exist now)
	modal = document.getElementById("custom-modal");
	backdrop = document.getElementById("custom-backdrop");
	
	// Update max-width if modal already existed
	if (modal) {
		modal.style.maxWidth = width;
	}
	
	// Unfocus any active element
	if (document.activeElement) {
		document.activeElement.blur();
	}
	
	// Add Enter key handler
	const handleEnterKey = (e) => {
		if (e.key === 'Enter') {
			hideCustomModal();
		}
	};
	document.addEventListener('keydown', handleEnterKey);
	
	// Store handler reference for cleanup
	modal._enterKeyHandler = handleEnterKey;
	
	// Register with modal manager
	modalManager.register('custom-modal', hideCustomModal);
	
	// Show modal
	if (backdrop) backdrop.style.display = "block";
	if (modal) modal.style.display = "block";
}

export function hideCustomModal() {
	const modal = document.getElementById("custom-modal");
	const backdrop = document.getElementById("custom-backdrop");
	
	// Remove Enter key handler
	if (modal && modal._enterKeyHandler) {
		document.removeEventListener('keydown', modal._enterKeyHandler);
		delete modal._enterKeyHandler;
	}
	
	if (modal) {
		modal.style.display = "none";
	}
	if (backdrop) {
		backdrop.style.display = "none";
	}
	
	// Unregister from modal manager
	modalManager.unregister('custom-modal');
}
