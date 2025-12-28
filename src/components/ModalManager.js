// Modal Manager - ensures only one modal is open at a time

class ModalManager {
	constructor() {
		this.currentModal = null;
	}

	// Register a modal as open
	register(modalId, hideFunction) {
		// Close any currently open modal
		if (this.currentModal && this.currentModal.id !== modalId) {
			this.currentModal.hideFunction();
		}
		this.currentModal = { id: modalId, hideFunction };
	}

	// Unregister a modal when it closes
	unregister(modalId) {
		if (this.currentModal && this.currentModal.id === modalId) {
			this.currentModal = null;
		}
	}

	// Close all modals
	closeAll() {
		if (this.currentModal) {
			this.currentModal.hideFunction();
			this.currentModal = null;
		}
	}
}

// Export singleton instance
export const modalManager = new ModalManager();
