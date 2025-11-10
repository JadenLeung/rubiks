// Create a dialog to show solve details
function showSolveDialog(solveNumber, time, moves, scramble, cubename, scrambletype, inputtype, onDelete) {
	console.log("scramble is ", scramble, cubename);
	let modal = document.getElementById("solve-detail-dialog");
	let backdrop = document.getElementById("solve-detail-backdrop");
	
	// Check if device is iOS or macOS
	const isAppleDevice = /iPhone|iPad|iPod|Macintosh|MacIntel|MacPPC|Mac68K/.test(navigator.userAgent) || 
	                       (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

	if (!modal) {
		modal = document.createElement("div");
		modal.id = "solve-detail-dialog";
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
		<h4>Solve Details</h4>
		<div id="solve-detail-content" style="margin: 20px 0; text-align: left;"></div>
		<div style="display: flex; gap: 10px;">
			${isAppleDevice ? '<button id="solve-detail-share-btn" class="btn btn-secondary" style="flex: 1;">Share</button>' : ''}
			<button id="solve-detail-delete-btn" class="btn btn-danger" style="flex: 1;">Delete</button>
			<button id="solve-detail-close-btn" class="btn btn-primary" style="flex: 1;">Close</button>
		</div>
	`;
	document.body.appendChild(modal);
	
	// Prevent clicks on modal from propagating
	modal.onclick = (e) => {
		e.stopPropagation();
	};

		backdrop = document.createElement("div");
		backdrop.id = "solve-detail-backdrop";
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
			modal.style.display = "none";
			backdrop.style.display = "none";
			// Restore canMan when closing
			if (window.canMan !== undefined) {
				window.canMan = true;
			}
		};


	const closeBtn = document.getElementById("solve-detail-close-btn");
	closeBtn.onclick = () => {
		modal.style.display = "none";
		backdrop.style.display = "none";
	// Restore canMan when closing
	if (window.canMan !== undefined) {
		window.canMan = true;
	}
};

const deleteBtn = document.getElementById("solve-detail-delete-btn");
deleteBtn.onclick = () => {
	// Will be set each time dialog is shown
};

if (isAppleDevice) {
	const shareBtn = document.getElementById("solve-detail-share-btn");
	shareBtn.onclick = () => {
		// Will be set each time dialog is shown
	};
}
}// Update delete button handler for this specific solve
const deleteBtn = document.getElementById("solve-detail-delete-btn");
deleteBtn.onclick = () => {
	// Delete from arrays using removeSpecificTime (solveNumber is 1-indexed, arrays are 0-indexed)
	const index = solveNumber - 1;	if (typeof window.removeSpecificTime === 'function') {
		window.removeSpecificTime(index);
	}
	
	// Close dialog
	modal.style.display = "none";
	backdrop.style.display = "none";
	
	// Restore canMan
	if (window.canMan !== undefined) {
		window.canMan = true;
	}
	
	// Call onDelete callback to refresh the table
	if (onDelete) {
		onDelete();
	}
};

// Update share button handler for this specific solve (only on Apple devices)
if (isAppleDevice) {
	const shareBtn = document.getElementById("solve-detail-share-btn");
	if (shareBtn) {
		shareBtn.onclick = () => {
			console.log("Clicking ", cubename)
			const scrambleTypeText = scrambletype !== "Normal" ? `\nScramble Type: ${scrambletype}` : '';
			const shareText = `I solved the ${cubename}!\nTime: ${time}${scrambleTypeText}\nScramble: ${scramble || 'N/A'}\nhttps://virtual-cube.net/`;
			const smsUrl = `sms:&body=${encodeURIComponent(shareText)}`;
			window.open(smsUrl, '_blank');
		};
	}
}
	// Update content
	const content = document.getElementById("solve-detail-content");
	content.innerHTML = `
		<p style="margin: 10px 0;"><strong>Cube:</strong> ${cubename}</p>
		<p style="margin: 10px 0;"><strong>Time:</strong> ${time}</p>
		<p style="margin: 10px 0;"><strong>Moves:</strong> ${moves}</p>
		${scrambletype !== "Normal" ? `<p style="margin: 10px 0;"><strong>Scramble Type:</strong> ${scrambletype}</p>` : ''}
		<p style="margin: 10px 0; display: flex; align-items: flex-start; gap: 8px;">
			<strong>Scramble:</strong> 
			<span id="scramble-text" style="flex: 1;">${scramble || 'N/A'}</span>
			${scramble && scramble !== 'N/A' ? `
			<button id="copy-scramble-btn" style="background: none; border: none; cursor: pointer; padding: 4px; display: flex; align-items: center;" title="Copy scramble">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
					<path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"/>
				</svg>
			</button>
			` : ''}
		</p>
	`;
	
	// Add copy functionality
	const copyBtn = document.getElementById("copy-scramble-btn");
	if (copyBtn && scramble) {
		copyBtn.onclick = (e) => {
			e.stopPropagation();
			navigator.clipboard.writeText(scramble).then(() => {
				// Visual feedback
				copyBtn.innerHTML = `
					<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
						<path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
					</svg>
				`;
				setTimeout(() => {
					copyBtn.innerHTML = `
						<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
							<path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"/>
						</svg>
					`;
				}, 1500);
			}).catch(err => {
				console.error('Failed to copy scramble:', err);
			});
		};
	}

	// Disable canMan when showing dialog
	if (window.canMan !== undefined) {
		window.canMan = false;
	}

	// Show dialog
	backdrop.style.display = "block";
	modal.style.display = "block";
}

export function updateRecentSolvesTable(MODE, ao5, mo5, movesarr, MINIMODE, keymapShown, solvedata, competedata, socketId, opponentId) {
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
	
	// Hide Ao5 and Mo5 stats in competing mode
	if (ao5StatDiv) ao5StatDiv.style.display = MODE === "competing" ? 'none' : '';
	if (mo5StatDiv) mo5StatDiv.style.display = MODE === "competing" ? 'none' : '';
	// console.log(ao5, mo5);
	let competearr = false;
	let opparr = false;
	let isCompeting = false;
	if (MODE === "competing" && competedata.data.type == "1v1")
	{
		competearr = ao5;
		opparr = competedata.solvedarr.map(obj => obj[opponentId]);
	}

	isCompeting = Array.isArray(competearr);
	
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
		const numRows = ["OLL", "PLL", "easy", "medium"].includes(MINIMODE) ? 4 : MODE == "competing" ? Math.min(5, competedata.data.dims.length): 5;
		
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
			
			if (i < Math.max(recentTimes.length, recentMoves.length)) {
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
				
				// Add click handler in normal mode (only on # column)
				if (MODE === "normal" || MODE == "cube" || MODE == "timed") {
					cellNum.style.cursor = "pointer";
					cellNum.style.textDecoration = "underline";
					cellNum.onclick = () => {
						const timeText = cellTime.textContent;
						const movesText = isCompeting || showMoves ? row.cells[2].textContent : 'N/A';
						const curSolveData = solvedata[solveNumber - 1]
						showSolveDialog(solveNumber, timeText, movesText, curSolveData.scramble ?? curSolveData, curSolveData.cubename, curSolveData.scrambletype, curSolveData.inputtype, () => {
							// Refresh the table after deletion
							updateRecentSolvesTable(MODE, ao5, mo5, movesarr, MINIMODE, keymapShown, solvedata, competedata, socketId, opponentId);
						});
					};
				}
				
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
			// Calculate Ao5: remove best and worst, then average the middle 3
			let ao5Value = 'N/A';
			if (recentTimes.length >= numRows) {
				const validTimes = recentTimes.filter(t => t !== "DNF" && t !== undefined && t !== null && !isNaN(t));
				if (validTimes.length >= 3) {
					const sortedTimes = [...validTimes].sort((a, b) => a - b);
					// Remove best (first) and worst (last)
					const middleTimes = sortedTimes.slice(1, -1);
					const totalMiddle = middleTimes.reduce((a, b) => a + b, 0);
					ao5Value = Math.round((totalMiddle / middleTimes.length) * 100) / 100;
				}
			}
			
			// Calculate Mo5 as mean of all valid solves (filter out N/A, undefined, null, DNF)
			const pickbigger = ao5.length > mo5.length ? ao5 : mo5;
			const allValidTimes = pickbigger.filter(t => t !== 'N/A' && t !== undefined && t !== null && t !== 'DNF' && !isNaN(t));
			let mo5Value = 'N/A';
			if (allValidTimes.length > 0) {
				const totalAllTimes = allValidTimes.reduce((a, b) => a + b, 0);
				mo5Value = Math.round((totalAllTimes / allValidTimes.length) * 100) / 100;
			}
			
			let bestTime = Math.min(...recentTimes.filter(t => t !== "DNF"));
			if (bestTime == Infinity) bestTime = 'N/A';
			
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
