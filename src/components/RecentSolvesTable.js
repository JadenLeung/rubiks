export function updateRecentSolvesTable(MODE, ao5, mo5, movesarr, MINIMODE, keymapShown) {
	const container = document.getElementById('recent_solves_container');
	const tbody = document.getElementById('recent_solves_body');
	const statsSummary = document.getElementById('stats_summary');
	const timesParOld = document.getElementById('times_par');
	const movesParOld = document.getElementById('moves_par');
	// console.log(ao5, mo5, movesarr);
	// Show table only in normal mode, otherwise show old format
	if ((MODE == "normal" && MINIMODE == "normal") || ["cube", "timed"].includes(MODE)
		|| (!keymapShown && ["pracPLL", "OLL"].includes(MINIMODE))) {
		container.style.display = 'block';
		container.style.marginBottom = ((MODE == "normal" && MINIMODE == "normal") || ["cube", "timed"].includes(MODE)) ? '0' : '16px';
		
		// Clear existing rows
		tbody.innerHTML = '';
		
		// Get last 5 solves (or fewer if less than 5) - use ao5 for times
		const startIndex = Math.max(0, ao5.length - 5);
		const recentTimes = ao5.slice(startIndex);
		const recentMoves = movesarr.slice(Math.max(0, movesarr.length - 5));
		
		// Always create exactly 5 rows
		for (let i = 0; i < 5; i++) {
			const row = tbody.insertRow();
			
			if (i < recentTimes.length) {
				// Row with data
				const solveNumber = ao5.length - recentTimes.length + i + 1;
				
				// # column
				const cellNum = row.insertCell(0);
				cellNum.textContent = solveNumber;
				
				// Time column
				const cellTime = row.insertCell(1);
				cellTime.textContent = recentTimes[i] + 's';
				
				// Moves column
				const cellMoves = row.insertCell(2);
				cellMoves.textContent = recentMoves[i] || 'N/A';
			} else {
				// Empty row
				const cellNum = row.insertCell(0);
				cellNum.textContent = '';
				
				const cellTime = row.insertCell(1);
				cellTime.textContent = '';
				
				const cellMoves = row.insertCell(2);
				cellMoves.textContent = '';
			}
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
		} else {
			// No solves yet - show N/A for all stats
			document.getElementById('ao5_stat').textContent = 'N/A';
			document.getElementById('mo5_stat').textContent = 'N/A';
			document.getElementById('best_time_stat').textContent = 'N/A';
		}
		
		// Always show stats summary
		statsSummary.style.display = 'block';
	} else {
		container.style.display = 'none';
	}
	if (container.style.display == 'block') {
        if (timesParOld) timesParOld.style.display = 'none';
        if (movesParOld) movesParOld.style.display = 'none';
    }
}
