import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  return (
    // para permitir usar el hook useQuery globalmente (en cualquier componente)
    <QueryClientProvider client={new QueryClient()}>
      <Wolframe />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}


//por ejemplo 4356 -> 4 + 3 + 5 + 8 = 20 -> 2 + 0 = 2
function raizDigital(numero_entero) {
  const numero = numero_entero.toString();
  if (numero.length === 1) {
    return numero;
  }
  const suma_digitos = numero.split('').reduce((a, b) => parseInt(a) + parseInt(b));
  console.log(suma_digitos)
  return raizDigital(suma_digitos);
}


function Wolframe() {
  const more_closed_forms = "&podstate=PossibleClosedForm__More"
  const images = "&format=image"    //sin necesidad de latex ni nada
  const api_id = "XLPLQ9-WVTJ4GL8WU"
  const roman = "&podstate=RomanNumerals__Other+historical+numerals"
  const formatos = "&podstate=SingleDateFormats__More+formats/calendars"
  const comparationNumber = 5000000;


  const [inputValue, setInputValue] = useState('');
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };


  //no hace falta el chequeo de si es entero, decimal o fecha, ya que filter
  //si no lo encuentra devuelve un array vacío, y map y flatMap sobre un array vacío no generan problemas
  const getSubpods = (wolframe_query, pod_id) => {
    let result = wolframe_query?.pods.filter(p => p.id === pod_id).flatMap(pod => pod.subpods).map(subpod => subpod.img);
    return result
  }

  const parseQuery = (wolframe_output) => {
    console.log("pods ", wolframe_output?.pods)
    const numero = parseFloat(inputValue)

    const propsSubpods = getSubpods(wolframe_output, "Property")
    const primesSubpods = getSubpods(wolframe_output, "PrimeFactorization")
    const comparitionSubpods = getSubpods(wolframe_output, "Comparison")
    const closedFormsSubpods = getSubpods(wolframe_output, "PossibleClosedForm")
    const formatosSubpods = getSubpods(wolframe_output, "RomanNumerals")
    const calendarSubpods = getSubpods(wolframe_output, "SingleDateFormats")
    const timerSubpods = getSubpods(wolframe_output, "DifferenceConversions")


    return (
      <div>
        <h2>Propiedades</h2>
        {propsSubpods.map((image, index) => <img key={index} src={image.src} alt={image.alt} />)}

        <h2>Factorizacion de primos</h2>
        {primesSubpods.map((image, index) => <img key={index} src={image.src} alt={image.alt} />)}

        <h2>Calendarios</h2>
        {formatosSubpods.map((image, index) => <img key={index} src={image.src} alt={image.alt} />)}

        <h2>Comparacion</h2>
        {comparitionSubpods.map((image, index) => <img key={index} src={image.src} alt={image.alt} />)}

        <h2>closedFormsSubpods</h2>
        {closedFormsSubpods.map((image, index) => <img key={index} src={image.src} alt={image.alt} />)}

        <h2>Fecha</h2>
        {calendarSubpods.map((image, index) => <img key={index} src={image.src} alt={image.alt} />)}

        <h2>Hora</h2>
        {timerSubpods.map((image, index) => <img key={index} src={image.src} alt={image.alt} />)}

      </div>
    )
    // }

  }



  const query = useQuery('wolfram', async () => {
    let api = `https://api.wolframalpha.com/v2/query?input=${inputValue}&output=JSON&appid=${api_id}${formatos}${more_closed_forms}${roman}`
    const response = await fetch(api);
    const data = await response.json();     //await se usa para esperar a que la promesa se resuelva
    console.log("los datos de la query fueron ", data.queryresult)
    const resultados = parseQuery(data.queryresult)
    return resultados;
  }, {
    enabled: false,
  });

  const handleClick = () => {
    if (!inputValue) return   //si input esta vacio
    console.log("el input anterior fue ", query.data?.inputstring)
    if (query.data?.inputstring === inputValue) return    //si el input es igual al anterior

    query.refetch();
  };

  return (
    <>
      <div className="container mx-auto mt-5 pb-4 bg-blue-200 text-gray-600 rounded">
        <h1 className="text-3xl font-bold underline text-center py-4">Find a number</h1>
        <p className="text-center">Find a pattern in a number you like, or when its used or expresion similars to it</p>
      </div>
      <div>
        <input
          type="text"
          className="w-80 mx-auto border-2 rounded-l-md p-2 my-5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          value={inputValue}
          onChange={handleChange}
        />
        <button
          className="bg-purple-600 text-white rounded-r-md px-3 h-12"
          onClick={handleClick}
        >Search</button>
        {(query.isLoading || query.isFetching) && <div>Loading...</div>}
        {query.isSuccess && <div>{query.data}</div>}
        {query.isError && <div>Error: {query.error.message}</div>}
      </div>
    </>
  );
}

export default App;
