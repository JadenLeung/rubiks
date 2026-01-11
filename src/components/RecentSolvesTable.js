// SVG icon for jump to position button
import { modalManager } from './ModalManager.js';

const jumpToPositionIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>`;

// Create a dialog to show solve details
function showSolveDialog(solveNumber, time, moves, scramble, cubename, scrambletype, solvestat, onDelete, mode, MINIMODE) {
	console.log("scramble is ", scramble, cubename);
	let modal = document.getElementById("solve-detail-dialog");
	let backdrop = document.getElementById("solve-detail-backdrop");
	
	// Check if device is iOS or macOS
	const isAppleDevice = /iPhone|iPad|iPod|Macintosh|MacIntel|MacPPC|Mac68K/.test(navigator.userAgent) || 
	                       (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
	
	// Helper function to create load position button with data attributes
	const createLoadPositionButton = (pos, cubename, title = "Load cube position at this solve stage", scramble = "") => {
		return pos ? `<button class="load-position-btn" data-pos="${pos}" data-cubename="${cubename}" data-scramble="${scramble}" style="background: none; border: none; cursor: pointer; padding: 4px; display: inline-flex; align-items: center; margin-left: 8px;" title="${title}">${jumpToPositionIcon}</button>` : '';
	};

	// Function to handle load position button clicks
	const handleLoadPositionClick = (pos, cubename, scramble = "") => {
		window.setPosition(pos, cubename, scramble);
		// Close the dialog by accessing elements directly
		const modal = document.getElementById("solve-detail-dialog");
		const backdrop = document.getElementById("solve-detail-backdrop");
		if (modal) modal.style.display = "none";
		if (backdrop) backdrop.style.display = "none";
		if (window.canMan !== undefined) {
			window.canMan = true;
		}
	};
	
	// Function to attach event listeners to all load position buttons
	const attachLoadPositionListeners = () => {
		const buttons = document.querySelectorAll('.load-position-btn');
		buttons.forEach(button => {
			button.onclick = (e) => {
				e.stopPropagation();
				const pos = button.getAttribute('data-pos');
				const cubename = button.getAttribute('data-cubename');
				const scramble = button.getAttribute('data-scramble');
				handleLoadPositionClick(pos, cubename, scramble);
			};
		});
	};

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
			<button id="solve-detail-delete-btn" class="btn btn-danger" style="flex: 1; display: none;">Delete</button>
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
	}

	// Define closeSolveDialog function (must be outside the if block)
	function closeSolveDialog() {
		modal.style.display = "none";
		backdrop.style.display = "none";
		if (window.canMan !== undefined) {
			window.canMan = true;
		}
		// Remove Enter key listener
		if (modal._enterKeyHandler) {
			document.removeEventListener('keydown', modal._enterKeyHandler);
			modal._enterKeyHandler = null;
		}
	}

	const closeBtn = document.getElementById("solve-detail-close-btn");
	closeBtn.onclick = closeSolveDialog;

	// Add Enter key listener
	const handleEnterKey = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			closeSolveDialog();
		}
	};
	modal._enterKeyHandler = handleEnterKey;
	document.addEventListener('keydown', handleEnterKey);

	// Update delete button handler for this specific solve
	const deleteBtn = document.getElementById("solve-detail-delete-btn");

// Show delete button only in normal, cube, or timed mode
if (mode === "normal" || mode === "cube" || mode === "timed" || ["practice", "pracPLL"].includes(MINIMODE)) {
	deleteBtn.style.display = '';
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
} else {
	deleteBtn.style.display = 'none';
}

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
			<button id="copy-scramble-btn" style="background: none; border: none; cursor: pointer; padding: 4px; display: flex; align-items: center; margin-right:-10px;" title="Copy scramble">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
					<path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"/>
				</svg>
			</button>
			${solvestat.pos ? createLoadPositionButton(solvestat.pos, cubename, "Load scramble position", scramble) : ''}
			` : ''}
		</p>
	`;

	// If solve object (from global solvedata) contains solvestat and it's active, show a Solve Stat breakdown
	try {
		const stat = solvestat;
		const totalTime = typeof time === 'number' ? time : (typeof time === 'string' ? parseFloat(time) : NaN);
		const totalMoves = typeof moves === 'number' ? moves : (typeof moves === 'string' ? parseInt(moves, 10) : NaN);
		const fmtTime = (n) => (isNaN(n) ? 'N/A' : (Math.round(n * 100) / 100) + 's');
		const fmtMoves = (n) => (isNaN(n) ? 'N/A' : n);
		
		// 3x3 solve statistics
		if (cubename === "3x3" && stat && stat.active && (stat.cross || stat.f2l || stat.oll)) {
			let solvemethod = "CFOP";
			if (stat.side && stat.f2l?.moves - stat.side?.moves >= 15) {
				solvemethod = "Beginner's Method";
			}

			const cross = stat.cross?.time !== undefined ? Number(stat.cross.time) : NaN;
			const crossMoves = stat.cross?.moves !== undefined ? Number(stat.cross.moves) : NaN;
			const f2l = stat.f2l?.time !== undefined ? Number(stat.f2l.time) : NaN;
			const f2lMoves = stat.f2l?.moves !== undefined ? Number(stat.f2l.moves) : NaN;
			const oll = stat.oll?.time !== undefined ? Number(stat.oll.time) : NaN;
			const ollMoves = stat.oll?.moves !== undefined ? Number(stat.oll.moves) : NaN;

			let f2lPairing = (!isNaN(f2l) && !isNaN(cross)) ? f2l - cross : NaN;
			let f2lPairingMoves = (!isNaN(f2lMoves) && !isNaN(crossMoves)) ? f2lMoves - crossMoves : NaN;
			let sideSegment, sideSegmentMoves;
			if (solvemethod === "Beginner's Method") {
				const side = stat.side?.time !== undefined ? Number(stat.side.time) : NaN;
				const sideMoves = stat.side?.moves !== undefined ? Number(stat.side.moves) : NaN;
				sideSegment = (!isNaN(side) && !isNaN(cross)) ? side - cross : NaN;
				sideSegmentMoves = (!isNaN(sideMoves) && !isNaN(crossMoves)) ? sideMoves - crossMoves : NaN;
				f2lPairing = (!isNaN(f2l) && !isNaN(side)) ? f2l - side : NaN;
				f2lPairingMoves = (!isNaN(f2lMoves) && !isNaN(sideMoves)) ? f2lMoves - sideMoves : NaN;
			}
			const ollSegment = (!isNaN(oll) && !isNaN(f2l)) ? oll - f2l : NaN;
			const ollSegmentMoves = (!isNaN(ollMoves) && !isNaN(f2lMoves)) ? ollMoves - f2lMoves : NaN;
			const pllSegment = (!isNaN(totalTime) && !isNaN(oll)) ? totalTime - oll : NaN;
			const pllSegmentMoves = (!isNaN(totalMoves) && !isNaN(ollMoves)) ? totalMoves - ollMoves : NaN;

			const crossPos = stat.cross?.pos;
			const sidePos = stat.side?.pos;
			const f2lPos = stat.f2l?.pos;
			const ollPos = stat.oll?.pos;

			const statHtml = `
				<div id="solve-stat" style="margin-top: 12px; text-align: left;">
					<h5 style="margin-top: 40px;">${solvemethod} Solve Statistics</h5>
					<p style="margin:4px 0;"><strong>Cross:</strong> ${fmtTime(cross)} &nbsp; (${fmtMoves(crossMoves)} moves) ${createLoadPositionButton(crossPos, cubename)}</p>
					${solvemethod === "Beginner's Method" ? `<p style="margin:4px 0;"><strong>Side:</strong> ${fmtTime(sideSegment)} &nbsp; (${sideSegmentMoves} moves) ${createLoadPositionButton(sidePos, cubename)}</p>` : ''}
					<p style="margin:4px 0;"><strong>F2L:</strong> ${fmtTime(f2lPairing)} &nbsp; (${fmtMoves(f2lPairingMoves)} moves) ${createLoadPositionButton(f2lPos, cubename)}</p>
			<p style="margin:4px 0;"><strong>OLL:</strong> ${fmtTime(ollSegment)} &nbsp; (${fmtMoves(ollSegmentMoves)} moves) ${createLoadPositionButton(ollPos, cubename)}</p>
					<p style="margin:4px 0;"><strong>PLL:</strong> ${fmtTime(pllSegment)} &nbsp; (${fmtMoves(pllSegmentMoves)} moves)</p>
				</div>
			`;

			content.innerHTML += statHtml;
		}
		
		// 2x2 solve statistics
		if (cubename === "2x2" && stat && stat.active && stat.side) {
			const firstlayer = stat.firstlayer?.time !== undefined ? Number(stat.firstlayer.time) : NaN;
			const side = stat.side?.time !== undefined ? Number(stat.side.time) : NaN;
			const oll = stat.oll?.time !== undefined ? Number(stat.oll.time) : NaN;
			const firstlayerMoves = stat.firstlayer?.moves !== undefined ? Number(stat.firstlayer.moves) : NaN;
			const sideMoves = stat.side?.moves !== undefined ? Number(stat.side.moves) : NaN;
			const ollMoves = stat.oll?.moves !== undefined ? Number(stat.oll.moves) : NaN;
			
			// Check if firstlayer == side (in time)
			if (!isNaN(firstlayer) && !isNaN(side) && !isNaN(totalMoves) &&
			    Math.abs(firstlayer - side) < 0.01) {
				
				// Determine method based on move count
				if (!isNaN(oll) && ollMoves + 4 < totalMoves) {
					// Beginner's Method: show First Layer, OLL, PLL
					const ollSegment = oll - firstlayer;
					const ollSegmentMoves = (!isNaN(ollMoves) && !isNaN(firstlayerMoves)) ? ollMoves - firstlayerMoves : NaN;
					const pllSegment = totalTime - oll;
					const pllSegmentMoves = (!isNaN(totalMoves) && !isNaN(ollMoves)) ? totalMoves - ollMoves : NaN;
					
					const firstlayerPos = stat.firstlayer?.pos;
					const ollPos = stat.oll?.pos;
					
					const statHtml = `
						<div id="solve-stat" style="margin-top: 12px; text-align: left;">
							<h5 style="margin-top: 40px;">Beginner's Method Solve Statistics</h5>
				<p style="margin:4px 0;"><strong>First Layer:</strong> ${fmtTime(firstlayer)} &nbsp; (${fmtMoves(firstlayerMoves)} moves) ${createLoadPositionButton(firstlayerPos, cubename)}</p>
					<p style="margin:4px 0;"><strong>OLL:</strong> ${fmtTime(ollSegment)} &nbsp; (${fmtMoves(ollSegmentMoves)} moves) ${createLoadPositionButton(ollPos, cubename)}</p>
						<p style="margin:4px 0;"><strong>PLL:</strong> ${fmtTime(pllSegment)} &nbsp; (${fmtMoves(pllSegmentMoves)} moves)</p>
					</div>
				`;
					
					content.innerHTML += statHtml;
				} else {
					// CLL Method: show First Layer, Last Layer
					const lastLayerSegment = totalTime - firstlayer;
					const lastLayerSegmentMoves = (!isNaN(totalMoves) && !isNaN(firstlayerMoves)) ? totalMoves - firstlayerMoves : NaN;
					
					const firstlayerPos = stat.firstlayer?.pos;
					
					const statHtml = `
						<div id="solve-stat" style="margin-top: 12px; text-align: left;">
							<h5 style="margin-top: 40px;">CLL Method Solve Statistics</h5>
				<p style="margin:4px 0;"><strong>First Layer:</strong> ${fmtTime(firstlayer)} &nbsp; (${fmtMoves(firstlayerMoves)} moves) ${createLoadPositionButton(firstlayerPos, cubename)}</p>
						<p style="margin:4px 0;"><strong>Last Layer:</strong> ${fmtTime(lastLayerSegment)} &nbsp; (${fmtMoves(lastLayerSegmentMoves)} moves)</p>
					</div>
				`;
					
					content.innerHTML += statHtml;
				}
			} else if (!isNaN(firstlayer) && !isNaN(side) && !isNaN(oll) && !isNaN(sideMoves) && !isNaN(ollMoves) && !isNaN(totalMoves)) {
				// Ortega Method: side != firstlayer
				const ollSegment = oll - side;
				const ollSegmentMoves = (!isNaN(ollMoves) && !isNaN(sideMoves)) ? ollMoves - sideMoves : NaN;
				const pblSegment = totalTime - oll;
				const pblSegmentMoves = (!isNaN(totalMoves) && !isNaN(ollMoves)) ? totalMoves - ollMoves : NaN;
				
				const sidePos = stat.side?.pos;
				const ollPos = stat.oll?.pos;
				
				const statHtml = `
					<div id="solve-stat" style="margin-top: 12px; text-align: left;">
						<h5 style="margin-top: 40px;">Ortega Method Solve Statistics</h5>
						<p style="margin:4px 0;"><strong>Side:</strong> ${fmtTime(side)} &nbsp; (${fmtMoves(sideMoves)} moves) ${createLoadPositionButton(sidePos, cubename)}</p>
				<p style="margin:4px 0;"><strong>OLL:</strong> ${fmtTime(ollSegment)} &nbsp; (${fmtMoves(ollSegmentMoves)} moves) ${createLoadPositionButton(ollPos, cubename)}</p>
					<p style="margin:4px 0;"><strong>PBL:</strong> ${fmtTime(pblSegment)} &nbsp; (${fmtMoves(pblSegmentMoves)} moves)</p>
				</div>
			`;
				
				content.innerHTML += statHtml;
			}
		}
	} catch (e) {
		console.warn('Failed to render solve stat', e);
	}
	
	// Attach event listeners to all load position buttons
	attachLoadPositionListeners();
	
	// Add copy functionality
	const copyBtn = document.getElementById("copy-scramble-btn");
	if (copyBtn && scramble) {
		if (scramble.includes("(")) {
			scramble = scramble.split("(")[0];
		}
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

	// Register with modal manager
	modalManager.register('solve-detail-dialog', closeSolveDialog);

	// Show dialog
	backdrop.style.display = "block";
	modal.style.display = "block";
}

export function updateRecentSolvesTable(MODE, mo5, movesarr, MINIMODE, keymapShown, solvedata, competedata, socketId, opponentId, ma_data, isthin) {
	const container = document.getElementById('recent_solves_container');
	const tbody = document.getElementById('recent_solves_body');
	const statsSummary = document.getElementById('stats_summary');
	const timesParOld = document.getElementById('times_par');
	const movesParOld = document.getElementById('moves_par');
	const movesHeader = document.getElementById('moves_header');
	const ao5Header = document.getElementById('ao5_header');
	const ao12Header = document.getElementById('ao12_header');
	const peeksHeader = document.getElementById('peeks_header');
	const mo5StatDiv = document.getElementById('mo5_stat').parentElement;
	const ao5StatDiv = document.getElementById('ao5_stat').parentElement;
	const timeHeader = document.getElementById('time_header');
	
	// Initialize table scroll offset if not exists
	if (window.tableScrollOffset === undefined) {
		window.tableScrollOffset = 0;
	}
	
	// Setup scroll buttons
	const scrollUpBtn = document.getElementById('table_scroll_up');
	const scrollDownBtn = document.getElementById('table_scroll_down');
	
	if (scrollUpBtn && scrollDownBtn) {
		scrollUpBtn.onclick = (e) => {
			e.stopPropagation();
			window.tableScrollOffset++;
			updateRecentSolvesTable(MODE, mo5, movesarr, MINIMODE, keymapShown, solvedata, competedata, socketId, opponentId, ma_data);
		};
		
		scrollDownBtn.onclick = (e) => {
			e.stopPropagation();
			if (window.tableScrollOffset > 0) {
				window.tableScrollOffset--;
				updateRecentSolvesTable(MODE, mo5, movesarr, MINIMODE, keymapShown, solvedata, competedata, socketId, opponentId, ma_data);
			}
		};
	}
	
	
	// Determine if we should show moves column (hide only when competing)
	const showMoves = MODE !== "competing";
	const isMarathonNonBlind = MINIMODE == "marathon" && ma_data?.type != "blind";
	const showAo5 = showMoves && mo5.length >= 5 && !isMarathonNonBlind;
	const showAo12 = showMoves && mo5.length >= 12 && !isthin && !isMarathonNonBlind;
	const showPeeks = MINIMODE == "marathon" && ma_data?.type == "blind";
	
	// Show/hide moves, ao5, and ao12 column headers and colgroups
	if (movesHeader) movesHeader.style.display = showMoves ? '' : 'none';
	if (ao5Header) ao5Header.style.display = showAo5 ? '' : 'none';
	if (ao12Header) ao12Header.style.display = showAo12 ? '' : 'none';
	if (peeksHeader) peeksHeader.style.display = showPeeks ? '' : 'none';
	
	// Also hide/show the colgroup columns
	const movesCol = document.getElementById('moves_col');
	const movesColBody = document.getElementById('moves_col_body');
	const ao5Col = document.getElementById('ao5_col');
	const ao5ColBody = document.getElementById('ao5_col_body');
	const ao12Col = document.getElementById('ao12_col');
	const ao12ColBody = document.getElementById('ao12_col_body');
	const peeksCol = document.getElementById('peeks_col');
	const peeksColBody = document.getElementById('peeks_col_body');
	
	if (movesCol) movesCol.style.display = showMoves ? '' : 'none';
	if (movesColBody) movesColBody.style.display = showMoves ? '' : 'none';
	if (ao5Col) ao5Col.style.display = showAo5 ? '' : 'none';
	if (ao5ColBody) ao5ColBody.style.display = showAo5 ? '' : 'none';
	if (ao12Col) ao12Col.style.display = showAo12 ? '' : 'none';
	if (ao12ColBody) ao12ColBody.style.display = showAo12 ? '' : 'none';
	if (peeksCol) peeksCol.style.display = showPeeks ? '' : 'none';
	if (peeksColBody) peeksColBody.style.display = showPeeks ? '' : 'none';
	
	// Hide Ao5 and Mo5 stats in competing mode
	if (ao5StatDiv) ao5StatDiv.style.display = MODE === "competing" ? 'none' : '';
	if (mo5StatDiv) mo5StatDiv.style.display = MODE === "competing" ? 'none' : '';
	// console.log(ao5, mo5);
	let competearr = false;
	let opparr = false;
	let isCompeting = false;
	let groupPlayers = []; // Array of player IDs for group mode
	let groupPlayerNames = []; // Array of player names for group mode
	
	if (MODE === "competing" && competedata.data.type == "1v1")
	{
		competearr = competedata.solvedarr.map(obj => obj[socketId]);
		opparr = competedata.solvedarr.map(obj => obj[opponentId]);
		
		// Append current round from competedata.solved if it exists and has values
		if (competedata.solved && Object.keys(competedata.solved).length > 0 && competedata.solvedarr.length <= competedata.round) {
			competearr.push(competedata.solved[socketId] || undefined);
			opparr.push(competedata.solved[opponentId] || undefined);
		}
	}
	else if (MODE === "competing" && competedata.data.type == "group")
	{
		// For group mode, get all player IDs and reorder so current player is first
		const allPlayers = competedata.userids || [];
		groupPlayers = [];
		groupPlayerNames = [];
		
		// Add current player first
		if (allPlayers.includes(socketId)) {
			groupPlayers.push(socketId);
			groupPlayerNames.push(competedata.names[socketId] || 'Unknown');
		}
		
		// Add other players
		allPlayers.forEach(id => {
			if (id !== socketId) {
				groupPlayers.push(id);
				groupPlayerNames.push(competedata.names[id] || 'Unknown');
			}
		});
		
		// Create arrays for each player's times (mapped to reordered groupPlayers)
		competearr = competedata.solvedarr.map(obj => {
			return groupPlayers.map(playerId => obj[playerId]);
		});
		
		// Append current round from competedata.solved if it exists
		if (competedata.solved && Object.keys(competedata.solved).length > 0 && competedata.solvedarr.length <= competedata.round) {
			competearr.push(groupPlayers.map(playerId => competedata.solved[playerId] || undefined));
		}
	}

	isCompeting = Array.isArray(competearr);
	
	// Update header text based on mode
	if (timeHeader) {
		// Get column definitions
		const timeCol = document.getElementById('time_col');
		const timeColBody = document.getElementById('time_col_body');
		const movesColHeader = document.getElementById('moves_col');
		const movesColBodyElem = document.getElementById('moves_col_body');
		
		const isGroupMode = MODE === "competing" && competedata.data.type == "group";
		
		if (isGroupMode) {
			// Hide default time and moves columns
			timeHeader.style.display = 'none';
			movesHeader.style.display = 'none';
			if (timeCol) timeCol.style.display = 'none';
			if (timeColBody) timeColBody.style.display = 'none';
			if (movesColHeader) movesColHeader.style.display = 'none';
			if (movesColBodyElem) movesColBodyElem.style.display = 'none';
			
			// Get or create dynamic columns container in thead
			const theadRow = timeHeader.parentElement;
			const colgroup = document.querySelector('#recent_solves_table colgroup');
			const colgroupBody = document.querySelector('#recent_solves_table + div table colgroup');
			
			// Remove existing dynamic player columns
			document.querySelectorAll('.dynamic-player-header').forEach(el => el.remove());
			document.querySelectorAll('.dynamic-player-col').forEach(el => el.remove());
			
			// Track if we've already marked a column as "You"
			let youColumnMarked = false;
			
			// Add column for each player
			groupPlayers.forEach((playerId, idx) => {
				const playerName = groupPlayerNames[idx];
				const isCurrentPlayer = playerId === socketId && !youColumnMarked;
				if (isCurrentPlayer) youColumnMarked = true;
				
				// Add header
				const th = document.createElement('th');
				th.className = 'dynamic-player-header';
				th.style.cssText = 'padding: 4px 8px; text-align: center; border: 1px solid;';
				if (isCurrentPlayer) {
					th.innerHTML = `${playerName} (You)`;
				} else {
					th.textContent = playerName;
				}
				theadRow.insertBefore(th, ao5Header);
				
				// Add colgroup for header table
				const col = document.createElement('col');
				col.className = 'dynamic-player-col';
				col.style.width = '80px';
				colgroup.insertBefore(col, document.getElementById('ao5_col'));
				
				// Add colgroup for body table
				if (colgroupBody) {
					const colBody = document.createElement('col');
					colBody.className = 'dynamic-player-col';
					colBody.style.width = '80px';
					const ao5ColBody = document.getElementById('ao5_col_body');
					if (ao5ColBody) {
						colgroupBody.insertBefore(colBody, ao5ColBody);
					} else {
						colgroupBody.appendChild(colBody);
					}
				}
			});
			
			// Store which column index is marked as You for later use
			window.youColumnIndex = groupPlayers.findIndex((pid, i) => {
				for (let j = 0; j < i; j++) {
					if (groupPlayers[j] === socketId) return false;
				}
				return pid === socketId;
			});
			
			// Synchronize horizontal scroll between header and body for group mode
			const scrollableBody = document.querySelector('#recent_solves_container > div > div[style*="overflow-y"]');
			const headerTable = document.getElementById('recent_solves_table');
			const tableContainer = document.querySelector('#recent_solves_container > div');
			if (scrollableBody && headerTable && tableContainer) {
				// Enable horizontal scrolling on the body div
				scrollableBody.style.overflowX = 'auto';
				
				// Set overflow hidden on the table container to clip the shifted header
				tableContainer.style.overflowX = 'hidden';
				
				// Remove any existing scroll listener
				if (window.groupScrollListener) {
					const oldBody = document.querySelector('#recent_solves_container > div > div[style*="overflow-y"]');
					if (oldBody) oldBody.removeEventListener('scroll', window.groupScrollListener);
				}
				
				// Add new scroll listener to sync header with body scroll
				window.groupScrollListener = function() {
					headerTable.style.marginLeft = -this.scrollLeft + 'px';
				};
				scrollableBody.addEventListener('scroll', window.groupScrollListener);
			}
		} else if (isCompeting) {
			timeHeader.textContent = 'You';
			movesHeader.textContent = 'Opponent';
			movesHeader.style.display = ''; // Show opponent column in competing mode
			// Set equal widths for competing mode on column definitions
			if (timeCol) timeCol.style.width = '50%';
			if (timeColBody) timeColBody.style.width = '50%';
			if (movesColHeader) movesColHeader.style.width = '50%';
			if (movesColBodyElem) movesColBodyElem.style.width = '50%';
		} else {
			// Normal mode - remove dynamic columns and reset headers
			document.querySelectorAll('.dynamic-player-header').forEach(el => el.remove());
			document.querySelectorAll('.dynamic-player-col').forEach(el => el.remove());
			
			// Clean up scroll listener when not in group mode
			if (window.groupScrollListener) {
				const scrollableBody = document.querySelector('#recent_solves_container > div > div[style*="overflow-y"]');
				const tableContainer = document.querySelector('#recent_solves_container > div');
				if (scrollableBody) {
					scrollableBody.removeEventListener('scroll', window.groupScrollListener);
					scrollableBody.style.overflowX = 'hidden'; // Reset overflow-x
				}
				if (tableContainer) {
					tableContainer.style.overflowX = 'visible'; // Reset container overflow
				}
				window.groupScrollListener = null;
			}
			
			// Reset header table margin
			const headerTable = document.getElementById('recent_solves_table');
			if (headerTable) headerTable.style.marginLeft = '0';
			
			timeHeader.textContent = 'Time';
			timeHeader.style.display = '';
			movesHeader.textContent = 'Moves';
			// Reset widths for normal mode
			if (timeCol) {
				timeCol.style.width = '80px';
				timeCol.style.display = '';
			}
			if (timeColBody) {
				timeColBody.style.width = '80px';
				timeColBody.style.display = '';
			}
			if (movesColHeader) movesColHeader.style.width = '60px';
			if (movesColBodyElem) movesColBodyElem.style.width = '60px';
		}
	}
	
	// console.log(MODE, MINIMODE);
	// Show table only in normal mode, otherwise show old format
	if ((MODE == "normal" && MINIMODE == "normal") || ["cube", "timed"].includes(MODE)
		|| (!keymapShown && ["pracPLL", "OLL", "PLL", "easy", "medium", "marathon", "practice"].includes(MINIMODE))
		|| (!keymapShown && ["competing"].includes(MODE) && competedata.data.type != "teamblind")) {
		container.style.display = 'block';
		container.style.marginBottom = ((MODE == "normal" && MINIMODE == "normal") || ["cube", "timed"].includes(MODE)) ? '0' : '16px';
		
		// Clear existing rows
		tbody.innerHTML = '';
		
		// Determine number of rows based on mode (4 for OLL/PLL, 5 for others)
		const numRows = ["OLL", "PLL", "easy", "medium"].includes(MINIMODE) ? 4 : MODE == "competing" ? Math.min(5, competedata.data.dims.length): 5;
		
		// Show ALL solves (scrollable div will handle overflow)
		let recentTimes, recentMoves;
		const isGroupMode = MODE === "competing" && competedata.data.type == "group";
		
		if (isCompeting && !isGroupMode) {
			recentTimes = competearr;
			recentMoves = opparr;
		} else if (isGroupMode) {
			recentTimes = competearr; // Array of arrays for group mode
		} else {
			recentTimes = mo5;
			recentMoves = movesarr;
		}
		
		// Hide scroll buttons since we're using native scrolling
		if (scrollUpBtn) scrollUpBtn.style.display = 'none';
		if (scrollDownBtn) scrollDownBtn.style.display = 'none';
		
		// Calculate total rows to show (at least numRows, but can be more if there are more solves)
		const totalRows = Math.max(numRows, recentTimes.length);
		
		// Create rows
		for (let i = 0; i < totalRows; i++) {
			const row = tbody.insertRow();
			
			if (i < recentTimes.length) {
				// Calculate solve number (1-indexed from the full array)
				const solveNumber = i + 1;
				
				// # column
				const cellNum = row.insertCell(0);
				cellNum.textContent = solveNumber;
				
				cellNum.style.cursor = "pointer";
				cellNum.style.textDecoration = "underline";
				cellNum.onclick = () => {
					const timeText = cellTime.textContent;
					const movesText = isCompeting || showMoves ? row.cells[2].textContent : 'N/A';
					const curSolveData = solvedata[solveNumber - 1]
					showSolveDialog(solveNumber, timeText, movesText, curSolveData.scramble ?? curSolveData, curSolveData.cubename, curSolveData.scrambletype, curSolveData.solvestat, () => {
						// Refresh the table after deletion
						updateRecentSolvesTable(MODE, mo5, movesarr, MINIMODE, keymapShown, solvedata, competedata, socketId, opponentId);
					}, MODE, MINIMODE);
				};
				
				// Time/You column
				const cellTime = row.insertCell(1);
				if (isGroupMode) {
					// For group mode, create a cell for each player
					const playerTimes = recentTimes[i];
					if (Array.isArray(playerTimes)) {
						groupPlayers.forEach((playerId, idx) => {
							const time = playerTimes[idx];
							const timeStr = time === undefined ? '' : (time + (time == "DNF" ? "" : 's'));
							const playerCell = row.insertCell();
						// Only bold the column that was marked as (You)
						if (idx === window.youColumnIndex) {
								playerCell.innerHTML = `<b>${timeStr}</b>`;
							} else {
								playerCell.textContent = timeStr;
							}
						});
					} else {
						// Empty cells for each player
						groupPlayers.forEach(() => {
							const playerCell = row.insertCell();
							playerCell.textContent = '';
						});
					}
					// Remove the default time cell since we created individual cells
					row.deleteCell(1);
				} else if (isCompeting) {
					cellTime.textContent = recentTimes[i] === undefined ? '' : (recentTimes[i] + (recentTimes[i] == "DNF" ? "" : 's'));
				} else {
					cellTime.textContent = recentTimes[i] + (recentTimes[i] == "DNF" ? "" : 's');
				}
			
			// Moves/Opponent column (show for competing or when showMoves is true)
			if ((isCompeting && !isGroupMode) || showMoves) {
				const cellMoves = row.insertCell(2);
				if (isCompeting && !isGroupMode) {
					cellMoves.textContent = recentMoves[i] === undefined ? '' : (recentMoves[i] + (recentMoves[i] == "DNF" ? "" : 's'));
				} else {
					cellMoves.textContent = recentMoves[i] || 'N/A';
				}
			}			
			// Ao5 column - calculate Ao5 for current solve
			if (showAo5) {
					const cellAo5 = row.insertCell(3);
					
					// Calculate Ao5 if we have at least 5 solves up to this point
					if (solveNumber >= 5) {
						// Get the 5 solves ending at this solve number
						const fiveSolves = mo5.slice(solveNumber - 5, solveNumber);
						const validTimes = fiveSolves.filter(t => t !== "DNF" && t !== undefined && t !== null && !isNaN(t));
						
						if (validTimes.length >= 3) {
							const sortedTimes = [...validTimes].sort((a, b) => a - b);
							// Remove best (first) and worst (last)
							const middleTimes = sortedTimes.slice(1, -1);
						const totalMiddle = middleTimes.reduce((a, b) => a + b, 0);
						const ao5Value = Math.round((totalMiddle / middleTimes.length) * 100) / 100;
						cellAo5.textContent = ao5Value + 's';
					} else {
						cellAo5.textContent = '';
					}
				} else {
					cellAo5.textContent = '';
					}
				}
				
				// Ao12 column - calculate Ao12 for current solve
				if (showAo12) {
					const cellAo12 = row.insertCell(showAo5 ? 4 : 3);
					
					// Calculate Ao12 if we have at least 12 solves up to this point
					if (solveNumber >= 12) {
						// Get the 12 solves ending at this solve number
						const twelveSolves = mo5.slice(solveNumber - 12, solveNumber);
						const validTimes = twelveSolves.filter(t => t !== "DNF" && t !== undefined && t !== null && !isNaN(t));
						
					if (validTimes.length >= 10) {
						const sortedTimes = [...validTimes].sort((a, b) => a - b);
						// Remove best (first) and worst (last)
						const middleTimes = sortedTimes.slice(1, -1);
						const totalMiddle = middleTimes.reduce((a, b) => a + b, 0);
						const ao12Value = Math.round((totalMiddle / middleTimes.length) * 100) / 100;
						cellAo12.textContent = ao12Value + 's';
					} else {
						cellAo12.textContent = '';
					}
				} else {
					cellAo12.textContent = '';
				}
			}
			
			// Peeks column
			if (showPeeks) {
				const cellPeeks = row.insertCell(showAo12 ? (showAo5 ? 5 : 4) : (showAo5 ? 4 : 3));
				const peeksValue = solvedata[i].peeks;
				cellPeeks.textContent = peeksValue !== undefined && peeksValue !== null ? peeksValue : 'N/A';
			}
		} else {
			// Empty row
				const cellNum = row.insertCell(0);
				cellNum.textContent = '';
				
				if (isGroupMode) {
					// Create empty cells for each player in group mode
					groupPlayers.forEach(() => {
						const playerCell = row.insertCell();
						playerCell.textContent = '';
					});
				} else {
					const cellTime = row.insertCell(1);
					cellTime.textContent = '';
				}
				
				// Moves/Opponent column (show for competing or when showMoves is true, but not for group mode)
				if ((isCompeting && !isGroupMode) || showMoves) {
					const cellMoves = row.insertCell(2);
					cellMoves.textContent = '';
				}
				
				// Ao5 column
				if (showAo5) {
					const cellAo5 = row.insertCell(3);
					cellAo5.textContent = '';
				}
				
				// Ao12 column
				if (showAo12) {
					const cellAo12 = row.insertCell(showAo5 ? 4 : 3);
					cellAo12.textContent = '';
				}

				// Peeks column
				if (showPeeks) {
					const cellPeeks = row.insertCell(showAo5 ? 4 : 3);
					cellPeeks.textContent = '';
				}
			}
		}
		
		// Update statistics
		// Check if we're in PLL/OLL mode or marathon non-blind mode
		const sumOfTimes = ["easy", "medium", "OLL", "PLL"].includes(MINIMODE) || isMarathonNonBlind;
		
		if (isCompeting) {
			// Hide all stats in competing mode
			document.getElementById('ao5_stat').parentElement.style.display = 'none';
			document.getElementById('mo5_stat').parentElement.style.display = 'none';
			document.getElementById('best_time_stat').parentElement.style.display = 'none';
			document.getElementById('best_ao5_div').style.display = 'none';
			statsSummary.style.display = 'none';
		} else if (showPeeks) {
			// Calculate total peeks
			const validPeeks = solvedata.filter(s => s && s.peeks !== undefined && s.peeks !== null && !isNaN(s.peeks));
			let totalPeeks = 0;
			if (validPeeks.length > 0) {
				totalPeeks = validPeeks.reduce((a, b) => a + b.peeks, 0);
			}
			
			// Hide Ao5 and Mo5 stats, show Total Peeks in best time
			document.getElementById('ao5_stat').parentElement.style.display = 'none';
			document.getElementById('mo5_stat').parentElement.style.display = 'none';
			document.getElementById('best_ao5_div').style.display = 'none';
			
			// Update best time label to "Total Peeks:" and show total
			const bestTimeDiv = document.getElementById('best_time_stat').parentElement;
			bestTimeDiv.style.display = '';
			const bestTimeLabel = bestTimeDiv.querySelector('strong');
			if (bestTimeLabel) bestTimeLabel.textContent = 'Total Peeks:';
			document.getElementById('best_time_stat').textContent = totalPeeks;
		} else if (sumOfTimes) {
			// Calculate sum of all valid times
			const validTimes = recentTimes.filter(t => t !== "DNF" && t !== undefined && t !== null && !isNaN(t));
			let sumValue = 'N/A';
			if (validTimes.length > 0) {
				const totalTime = validTimes.reduce((a, b) => a + b, 0);
				sumValue = Math.round(totalTime * 100) / 100;
			}
			
			// Hide Ao5 and Mo5, show sum in best time
			document.getElementById('ao5_stat').parentElement.style.display = 'none';
			document.getElementById('mo5_stat').parentElement.style.display = 'none';
			document.getElementById('best_ao5_div').style.display = 'none';
			
			// Update best time label to "Sum of Times" and show sum
			const bestTimeDiv = document.getElementById('best_time_stat').parentElement;
			bestTimeDiv.style.display = '';
			const bestTimeLabel = bestTimeDiv.querySelector('strong');
			if (bestTimeLabel) bestTimeLabel.textContent = 'Sum of Times:';
			document.getElementById('best_time_stat').textContent = sumValue === 'N/A' ? sumValue : sumValue + 's';
		} else if (recentTimes.length > 0) {
			// Normal mode - hide Ao5 stat, show Mo5 and Best Time
			document.getElementById('ao5_stat').parentElement.style.display = 'none';
			document.getElementById('mo5_stat').parentElement.style.display = '';
			
			// Restore best time label
			const bestTimeDiv = document.getElementById('best_time_stat').parentElement;
			bestTimeDiv.style.display = '';
			const bestTimeLabel = bestTimeDiv.querySelector('strong');
			if (bestTimeLabel) bestTimeLabel.textContent = 'Best Time:';
			
			// Calculate Mo5 as mean of all valid solves (filter out N/A, undefined, null, DNF)
			const allValidTimes = mo5.filter(t => t !== 'N/A' && t !== undefined && t !== null && t !== 'DNF' && !isNaN(t));
			let mo5Value = 'N/A';
			if (allValidTimes.length > 0) {
				const totalAllTimes = allValidTimes.reduce((a, b) => a + b, 0);
				mo5Value = Math.round((totalAllTimes / allValidTimes.length) * 100) / 100;
			}
			
			let bestTime = Math.min(...recentTimes.filter(t => t !== "DNF"));
			if (bestTime == Infinity) bestTime = 'N/A';
			
			// Calculate Best Ao5 from all possible Ao5s in mo5
			let bestAo5 = 'N/A';
			if (mo5.length >= 5) {
				const allAo5s = [];
				for (let i = 4; i < mo5.length; i++) {
					const fiveSolves = mo5.slice(i - 4, i + 1);
					const validTimes = fiveSolves.filter(t => t !== "DNF" && t !== undefined && t !== null && !isNaN(t));
					if (validTimes.length >= 3) {
						const sortedTimes = [...validTimes].sort((a, b) => a - b);
						const middleTimes = sortedTimes.slice(1, -1);
						const totalMiddle = middleTimes.reduce((a, b) => a + b, 0);
						const ao5Value = totalMiddle / middleTimes.length;
						allAo5s.push(ao5Value);
					}
				}
				if (allAo5s.length > 0) {
					bestAo5 = Math.round(Math.min(...allAo5s) * 100) / 100;
				}
			}
			
			document.getElementById('mo5_stat').textContent = mo5Value === 'N/A' ? mo5Value : mo5Value + 's';
			document.getElementById('best_time_stat').textContent = bestTime === 'N/A' ? bestTime : bestTime + 's';
			
			// Only show Best Ao5 if we have at least 5 solves
			if (mo5.length >= 5) {
				document.getElementById('best_ao5_stat').textContent = bestAo5 === 'N/A' ? bestAo5 : bestAo5 + 's';
				document.getElementById('best_ao5_div').style.display = '';
			} else {
				document.getElementById('best_ao5_div').style.display = 'none';
			}
		} else {
			// No solves yet - hide all stats
			document.getElementById('ao5_stat').parentElement.style.display = 'none';
			document.getElementById('mo5_stat').parentElement.style.display = 'none';
			document.getElementById('best_time_stat').parentElement.style.display = 'none';
			document.getElementById('best_ao5_div').style.display = 'none';
		}
		
		// Show stats summary only if not competing
		if (!isCompeting) {
			statsSummary.style.display = 'block';
		}
	} else {
		container.style.display = 'none';
	}
	if (container.style.display == 'block') {
        if (timesParOld) timesParOld.style.display = 'none';
        if (movesParOld) movesParOld.style.display = 'none';
    }
	
	// Scroll to bottom of the table body — defer to next frame so DOM is rendered
	const scrollableDiv = document.querySelector('#recent_solves_container div[style*="overflow-y"]');
	if (scrollableDiv) {
		requestAnimationFrame(() => {
			scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
		});
	}
}
