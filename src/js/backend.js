export async function getIP() {
	try {
		const response = await fetch('https://api.ipify.org?format=json');
		const data = await response.json();
		return data.ip;
	} catch (error) {
		console.error("Error fetching IP:", error);
		return "unknown";
	}
}

export async function printIP() {
	const IP = await getIP();
	console.log(IP);
}

export async function modeData(mode) {
	const IP = await getIP();
	console.log("IP is", IP);
	fetch("https://elephant4.azurewebsites.net/api/history", {
		method: "POST",
		body: JSON.stringify([{
		  ipaddr: IP,
		  mode: mode
		}]),
		headers: {
		  "Content-type": "application/json; charset=UTF-8"
		}
	  })
		.then((response) => console.log(response));
	console.log()
}