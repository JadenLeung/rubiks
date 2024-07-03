let visited = {};

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
    if (!visited[mode]) {
		visited[mode] = true;
	} else {
        return;
    }
	const IP = await getIP();
    const TIME = getDate();
	console.log("IP is", IP, "TIME is", TIME);
	fetch("https://elephant4.azurewebsites.net/api/history", {
		method: "POST",
		body: JSON.stringify([{
		  ipaddr: IP,
		  mode: mode,
          time: TIME
		}]),
		headers: {
		  "Content-type": "application/json; charset=UTF-8"
		}
	  })
		.then((response) => console.log(response));
	console.log()
}

function getDate () {
	const currentdate = new Date(); 
	const datetime = currentdate.getDate() + "/"
					+ (currentdate.getMonth()+1)  + "/" 
					+ currentdate.getFullYear() + " @ "  
					+ currentdate.getHours() + ":"  
					+ currentdate.getMinutes() + ":" 
					+ currentdate.getSeconds();
	return datetime;
}