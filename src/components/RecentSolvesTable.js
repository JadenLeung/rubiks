export function updateRecentSolvesTable(MODE, ao5, mo5, movesarr, MINIMODE, keymapShown, competedata, socketId, opponentId) {
	const container = document.getElementById('recent_solves_container');
	const tbody = document.getElementById('recent_solves_body');
	const statsSummary = document.getElementById('stats_summary');
	const timesParOld = document.getElementById('times_par');
	const movesParOld = document.getElementById('moves_par');
	const movesHeader = document.getElementById('moves_header');
	const mo5StatDiv = document.getElementById('mo5_stat').parentElement;
	const ao5StatDiv = document.getElementById('ao5_stat').parentElement;
	const timeHeader = document.getElementById('time_header');
	
	
	// Determine if we should show moves column (hide in speed mode)
	const showMoves = !["speed", "competing"].includes(MODE);
	
	// Show/hide moves column header and stat
	if (movesHeader) movesHeader.style.display = showMoves ? '' : 'none';
	if (mo5StatDiv) mo5StatDiv.style.display = showMoves ? '' : 'none';
	
	// Hide Ao5 stat in competing mode
	if (ao5StatDiv) ao5StatDiv.style.display = MODE === "competing" ? 'none' : '';

	let competearr = false;
	let opparr = false;
	let isCompeting = false;
	if (MODE === "competing" && competedata.data.type)
	{
		competearr = competedata.solvedarr.map(obj => obj[socketId]);
		opparr = competedata.solvedarr.map(obj => obj[opponentId]);
		isCompeting = Array.isArray(competearr);
	}
	
	// Update header text based on mode
	if (timeHeader) {
		if (isCompeting) {
			timeHeader.textContent = 'You';
			movesHeader.textContent = 'Opponent';
			movesHeader.style.display = ''; // Show opponent column in competing mode
		} else {
			timeHeader.textContent = 'Time';
			movesHeader.textContent = 'Moves';
		}
	}
	
	// console.log(MODE, MINIMODE);
	// Show table only in normal mode, otherwise show old format
	if ((MODE == "normal" && MINIMODE == "normal") || ["cube", "timed"].includes(MODE)
		|| (!keymapShown && ["pracPLL", "OLL", "PLL", "easy", "medium"].includes(MINIMODE))
		|| (!keymapShown && ["competing"].includes(MODE))) {
		container.style.display = 'block';
		container.style.marginBottom = ((MODE == "normal" && MINIMODE == "normal") || ["cube", "timed"].includes(MODE)) ? '0' : '16px';
		
		// Clear existing rows
		tbody.innerHTML = '';
		
		// Determine number of rows based on mode (4 for OLL/PLL, 5 for others)
		const numRows = ["OLL", "PLL", "easy", "medium"].includes(MINIMODE) ? 4 : 5;
		
		// Get last N solves (or fewer if less than N)
		let recentTimes, recentMoves;
		if (isCompeting) {
			// Use competearr and opparr for competing mode
			const startIndex = Math.max(0, competearr.length - numRows);
			recentTimes = competearr.slice(startIndex);
			recentMoves = opparr.slice(startIndex);
		} else {
			// Use ao5 for times in normal modes
			const startIndex = Math.max(0, ao5.length - numRows);
			recentTimes = ao5.slice(startIndex);
			recentMoves = movesarr.slice(Math.max(0, movesarr.length - numRows));
		}
		
		// Always create exactly N rows
		for (let i = 0; i < numRows; i++) {
			const row = tbody.insertRow();
			
			if (i < recentTimes.length) {
				// Row with data
				// For cube mode, use mo5.length for numbering, otherwise use ao5.length
				const solveNumber = isCompeting 
					? competearr.length - recentTimes.length + i + 1
					: mo5.length > 0 
						? mo5.length - recentTimes.length + i + 1
						: i + 1;
				
				// # column
				const cellNum = row.insertCell(0);
				cellNum.textContent = solveNumber;
				
				// Time/You column
				const cellTime = row.insertCell(1);
				if (isCompeting) {
					cellTime.textContent = recentTimes[i] === undefined ? '' : (recentTimes[i] + (recentTimes[i] == "DNF" ? "" : 's'));
				} else {
					cellTime.textContent = recentTimes[i] + (recentTimes[i] == "DNF" ? "" : 's');
				}
				
				// Moves/Opponent column (show for competing or when showMoves is true)
				if (isCompeting || showMoves) {
					const cellMoves = row.insertCell(2);
					if (isCompeting) {
						cellMoves.textContent = recentMoves[i] === undefined ? '' : (recentMoves[i] + (recentMoves[i] == "DNF" ? "" : 's'));
					} else {
						cellMoves.textContent = recentMoves[i] || 'N/A';
					}
				}
			} else {
				// Empty row
				const cellNum = row.insertCell(0);
				cellNum.textContent = '';
				
				const cellTime = row.insertCell(1);
				cellTime.textContent = '';
				
				// Moves/Opponent column (show for competing or when showMoves is true)
				if (isCompeting || showMoves) {
					const cellMoves = row.insertCell(2);
					cellMoves.textContent = '';
				}
			}
		}
		
		// Update statistics
		if (recentTimes.length > 0) {
			const totalTime = recentTimes.reduce((a, b) => a + b, 0);
			let ao5Value = recentTimes.length >= numRows ? (Math.round((totalTime / numRows) * 100) / 100) : 'N/A';
			const totalMoves = recentMoves.filter(m => m > 0).reduce((a, b) => a + b, 0);
			const mo5Value = recentMoves.length >= numRows ? Math.round(totalMoves / numRows) : 'N/A';
			let bestTime = Math.min(...recentTimes.filter(t => t !== "DNF"));
			if (bestTime == Infinity) bestTime = 'N/A';
			if (Number.isNaN(ao5Value)) ao5Value = 'N/A';
			
			document.getElementById('ao5_stat').textContent = ao5Value === 'N/A' ? ao5Value : ao5Value + 's';
			document.getElementById('mo5_stat').textContent = mo5Value === 'N/A' ? mo5Value : mo5Value + 's';
			document.getElementById('best_time_stat').textContent = bestTime === 'N/A' ? bestTime : bestTime + 's';
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
