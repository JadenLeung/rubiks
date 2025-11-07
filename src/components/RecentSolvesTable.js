export function updateRecentSolvesTable(MODE, ao5, mo5, movesarr, MINIMODE) {
	const container = document.getElementById('recent_solves_container');
	const tbody = document.getElementById('recent_solves_body');
	const statsSummary = document.getElementById('stats_summary');
	const timesParOld = document.getElementById('times_par');
	const movesParOld = document.getElementById('moves_par');
	console.log(MODE, MINIMODE)
	// Show table only in normal mode, otherwise show old format
    if (MODE == "normal" || MODE == "timed") {
        if (timesParOld) timesParOld.style.display = 'none';
        if (movesParOld) movesParOld.style.display = 'none';
    }
	if ((MODE == "normal" && MINIMODE == "normal") || MODE == "timed") {
		container.style.display = 'block';
		
		// Clear existing rows
		tbody.innerHTML = '';
		
		if (ao5.length > 0) {
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
				
				// Time column
				const cellTime = row.insertCell(1);
				cellTime.textContent = recentTimes[i] + 's';
				
				// Moves column
				const cellMoves = row.insertCell(2);
				cellMoves.textContent = recentMoves[i] || 'N/A';
			}
			
			// Update statistics
			const totalTime = recentTimes.reduce((a, b) => a + b, 0);
			const ao5Value = recentTimes.length >= 5 ? (Math.round((totalTime / 5) * 100) / 100) : 'N/A';
			const totalMoves = recentMoves.filter(m => m > 0).reduce((a, b) => a + b, 0);
			const mo5Value = recentMoves.length >= 5 ? Math.round(totalMoves / 5) : 'N/A';
			const bestTime = Math.min(...recentTimes);
			
			document.getElementById('ao5_stat').textContent = ao5Value === 'N/A' ? ao5Value : ao5Value + 's';
			document.getElementById('mo5_stat').textContent = mo5Value;
			document.getElementById('best_time_stat').textContent = bestTime + 's';
			
			statsSummary.style.display = 'block';
		} else {
			// No solves yet - show empty table with header only
			statsSummary.style.display = 'none';
		}
	} else {
		container.style.display = 'none';
	}
}
