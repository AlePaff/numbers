var api_id = "XLPLQ9-WVTJ4GL8WU";
var link = "http://api.wolframalpha.com/v2/query?appid=" + api_id;
// https://www.youtube.com/watch?v=uxf0--uiX0I  -> como usar una api


var input_numero = '16.09';
var formas_cerradas = 'https://api.wolframalpha.com/v2/query?input=closed+forms+of+' + input_numero + '&format=plaintext&output=JSON&appid=' + api_id;


const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
async function getISS(){
	const response = await fetch(formas_cerradas);
	const data = await response.json();

	document.getElementById('formas_cerradas').innerHTML = data.queryresult.pods[1].subpods[2].plaintext;;


}


getISS();