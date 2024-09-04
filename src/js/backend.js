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
    if (IP == '72.70.58.195' || IP == '192.159.178.221') {
        return;
    }
    const TIME = getDate();
	// console.log("IP is", IP, "TIME is", TIME);
	fetch("https://elephant4.azurewebsites.net/api/history2", {
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
}


export async function getUsers() {
    const url = "https://elephant4.azurewebsites.net/api/users2";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error(error.message);
      //return null;
    }
  }

  export async function matchPassword(username, password) {
    const url = `https://elephant4.azurewebsites.net/api/users2?username=${username}&password=${password}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  export async function putUsers(data, method) {
    //data = {waitfor: 0, ...data};
    console.log("Attemping to upload");
    await fetch("https://elephant4.azurewebsites.net/api/users2", {
		method: method,
		body: JSON.stringify([data]),
		headers: {
		  "Content-type": "application/json; charset=UTF-8"
		}
	  }).then((response) => {
        console.log(response);
    }).catch((err) => {
      console.log("Error " + err);
    });
    return true;
  }

  export async function printUsers() {
    const users = await getUsers();
    if (users != null) {
        console.log(users);
    }
  }


function getDate () {
    // Get the current date and time
    const now = new Date();

    // Format the date and time for the Eastern Time Zone
    const options = { timeZone: 'America/New_York', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = formatter.format(now);

    console.log(formattedDate);  // Output: MM/DD/YYYY, HH:MM:SS

	return formattedDate;
}