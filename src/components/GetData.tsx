import React, { useState, useEffect } from 'react';
import { useQuery } from "react-query";



//from https://reactjs.org/docs/faq-ajax.html
function GetData({ input_numero }) {

  var api_id = "XLPLQ9-WVTJ4GL8WU";
  var link = "http://api.wolframalpha.com/v2/query?appid=" + api_id;

  var formas_cerradas = 'https://api.wolframalpha.com/v2/query?input=closed+forms+of+' + input_numero + '&format=plaintext&output=JSON&appid=' + api_id;

  console.log(input_numero)
  console.log(formas_cerradas)

  // funcion que hace el fetch
  const getData = async () => {   //acepta cero argumentos
    const response = await fetch(formas_cerradas);    //fetch devuelve una promesa
    const data = await response.json();     //la promesa se resuelve con un json (que a su vez devuelve una promesa)
    return data;
  };


  //uso del hook useQuery
  const { status, data, error, isFetching, refetch } = useQuery(["wolfram_key"], getData, {
    refetchOnWindowFocus: false,                 //Hace que no se haga fetch cuando se cambia de pestaña
    enabled: false,    // no hacer fetch automaticamente (tampoco se actualiza la petición al apretar el boton, debe ser manual)
    // refetchOnMount: true
  });


  console.log(data?.queryresult);
  // return;

  // console.log(data?.queryresult);
  // console.log(data.queryresult.pods[1]);
  // console.log(data.queryresult.pods[1].subpods[0]);
  // console.log(data.queryresult.pods[1].subpods[0].plaintext);


  // const handleClick = () => {
  //   // (!) manually refetch on click event
  //   refetch();
  // };

  if (status === 'loading') { return <div>Loading...</div>; }
  if (isFetching) { return <div>Fetching...</div>; }
  if (status === 'error') { return <div>Error: {error.message}</div>; }
  // if(status === 'success') {return <div>{data}</div>;}
  // return

  return (
    <div>
      <button onClick={refetch}>Fetch data</button>
      <h1>Formas cerradas</h1>
      {/* <p>{data.queryresult.pods[1].subpods[0].plaintext}</p> */}
    </div>
  )


}

export default GetData;