var api_id = "XLPLQ9-WVTJ4GL8WU";

var link = "http://api.wolframalpha.com/v2/query?appid=" + api_id;


const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
async function getISS(){
	const response = await fetch(api_url);
	const data = await response.json();
	const {latitude, longitud} = data;

	document.getElementById('lat').textContent = latitude;

}


getISS();