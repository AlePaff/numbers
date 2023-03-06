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


function Wolframe() {

  const more_closed_forms = "&podstate=PossibleClosedForm__More"
  const images = "&format=image"    //sin necesidad de latex ni nada
  const api_id = "XLPLQ9-WVTJ4GL8WU"
  const calendarios = "&podstate=RomanNumerals__Other+historical+numerals"


  const [inputValue, setInputValue] = useState('');
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };



  const parseQuery = (wolframe_output) => {
    console.log("pods ", wolframe_output?.pods)
    // const numero = parseInt(inputValue, 10);    //base 10


    //si es numero entero
    if (inputValue.match(/^\d+$/)) {

      const filteredPods = wolframe_output?.pods.filter(p => p.id === "Property");// || p.id === "PrimeFactorization");
      const subpods = filteredPods.flatMap(pod => pod.subpods);   //convierte un array de arrays en un array plano
      // const plaintexts = subpods.map(subpod => subpod.plaintext);
      // console.log("plaintexts ", plaintexts)
      const images = subpods.map(subpod => subpod.img);

      
      return (
        <div>
          <h1>Propiedades</h1>
          {images.map((image, index) => <img key={index} src={image.src} alt={image.alt} />)}
          {/* <p>{plaintexts}</p> */}
        </div>
      )
    }

  }



  const query = useQuery('wolfram', async () => {
    let api = `https://api.wolframalpha.com/v2/query?input=${inputValue}&output=JSON&appid=${api_id}${calendarios}${more_closed_forms}`
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
        >Buscar</button>
        {query.isLoading && <div>Cargando...</div>}
        {query.isFetching && <div>Buscando...</div>}
        {query.isSuccess && <div>{query.data}</div>}
        {query.isError && <div>Error: {query.error.message}</div>}
      </div>
    </>
  );
}

export default App;
