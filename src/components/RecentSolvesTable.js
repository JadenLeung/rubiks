export function updateRecentSolvesTable(MODE, ao5, mo5, movesarr) {
	const container = document.getElementById('recent_solves_container');
	const tbody = document.getElementById('recent_solves_body');
	const timesParOld = document.getElementById('times_par');
	const movesParOld = document.getElementById('moves_par');
	
	// Show table only in normal mode with solves, otherwise show old format
	if (ao5.length > 0 && MODE == "normal") {
		container.style.display = 'block';
		if (timesParOld) timesParOld.style.display = 'none';
		if (movesParOld) movesParOld.style.display = 'none';
		
		// Clear existing rows
		tbody.innerHTML = '';
		
		// Get last 5 solves
		const startIndex = Math.max(0, ao5.length - 5);
		const recentTimes = ao5.slice(startIndex);
		const recentMoves = movesarr.slice(Math.max(0, movesarr.length - 5));
		
		// Add rows in reverse order (newest at top)
		for (let i = recentTimes.length - 1; i >= 0; i--) {
			const row = tbody.insertRow();
			const solveNumber = mo5.length - recentTimes.length + i + 1;
			
			// # column
			const cellNum = row.insertCell(0);
			cellNum.textContent = solveNumber;
			cellNum.style.cssText = 'padding: 6px; text-align: center; border: 1px solid #0a1970; font-weight: bold;';
			
			// Time column
			const cellTime = row.insertCell(1);
			cellTime.textContent = recentTimes[i] + 's';
			cellTime.style.cssText = 'padding: 6px; text-align: center; border: 1px solid #0a1970; font-family: monospace;';
			
			// Moves column
			const cellMoves = row.insertCell(2);
			cellMoves.textContent = recentMoves[i] || 'N/A';
			cellMoves.style.cssText = 'padding: 6px; text-align: center; border: 1px solid #0a1970;';
		}
		
		// Update statistics
		if (recentTimes.length > 0) {
			const totalTime = recentTimes.reduce((a, b) => a + b, 0);
			const ao5Value = recentTimes.length >= 5 ? (Math.round((totalTime / 5) * 100) / 100) : 'N/A';
			const totalMoves = recentMoves.filter(m => m > 0).reduce((a, b) => a + b, 0);
			const mo5Value = recentMoves.length >= 5 ? Math.round(totalMoves / 5) : 'N/A';
			const bestTime = Math.min(...recentTimes);
			
			document.getElementById('ao5_stat').textContent = ao5Value === 'N/A' ? ao5Value : ao5Value + 's';
			document.getElementById('mo5_stat').textContent = mo5Value;
			document.getElementById('best_time_stat').textContent = bestTime + 's';
		}
	} else {
		container.style.display = 'none';
		// Only reset display in normal mode - in other modes, leave the mode handler's display setting
		if (MODE == "normal") {
			if (timesParOld) timesParOld.style.display = '';
			if (movesParOld) movesParOld.style.display = '';
		}
	}
}
