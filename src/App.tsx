import { useState, useMutation } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import GetData from './components/GetData'
import { useForm } from "react-hook-form";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import { useQuery } from "react-query";


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
  var api_id = "XLPLQ9-WVTJ4GL8WU";

  var formas_cerradas: string;
  const [number, setNumber] = useState(0);

  // funcion que hace el fetch
  const getData = async () => {   //acepta cero argumentos
    console.log("nro es ", number);

    const response = await fetch(formas_cerradas);    //fetch devuelve una promesa
    const data = await response.json();     //la promesa se resuelve con un json (que a su vez devuelve una promesa)
    return data;
  };


  //uso del hook useQuery
  const { status, data, error, isFetching, refetch } = useQuery(["wolfram_key"], getData, {
    refetchOnWindowFocus: false,                 //Hace que no se haga fetch cuando se cambia de pestaña
    // enabled: false,    // no hacer fetch automaticamente (tampoco se actualiza la petición al apretar el boton, debe ser manual)
    // refetchOnMount: true
  });

  const handleAddNumber = () => {
    formas_cerradas = 'https://api.wolframalpha.com/v2/query?input=closed+forms+of+' + number + '&format=plaintext&output=JSON&appid=' + api_id;

    console.log("formas cerradas", formas_cerradas)
    getData()
    // refetch()
    console.log("data es", data)
  };


  // console.log(input_numero)
  // console.log(formas_cerradas)



  // console.log(data?.queryresult);
  // return;

  // console.log(data?.queryresult);
  // console.log(data.queryresult.pods[1]);
  // console.log(data.queryresult.pods[1].subpods[0]);
  // console.log(data.queryresult.pods[1].subpods[0].plaintext);


  // if (status === 'loading') { return <div>Loading...</div>; }
  // if (isFetching) { return <div>Fetching...</div>; }
  // if (status === 'error') { return <div>Error: {error.message}</div>; }
  // if(status === 'success') {return <div>{data}</div>;}
  // return







  return (
    <>
      <div className="container mx-auto mt-5 pb-4 bg-blue-200 text-gray-600 rounded">
        <h1 className="text-3xl font-bold underline text-center py-4">Find a number</h1>
        <p className="text-center">Find a pattern in a number you like, or when its used or expresion similars to it</p>
      </div>

      <div>
        <input
          type="number"
          className="w-80 mx-auto border-2 rounded-l-md p-2 my-5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        >

        </input>

        <button onClick={handleAddNumber}>Buscar</button>

      </div>


      {/* <div className="container grid place-content-center">

        <form onSubmit={handleSubmit((dataForm) => setData(dataForm))}> */}
      {/*
                setData toma el json que devuelve handleSubmit y lo guarda en el state cuando se hace submit
                register es una funcion que guarda el valor del input en el state
            */}
      {/* <input {...register(
            "input_user",
            { pattern: /^[0-9]+.+$/i }
          )}
            placeholder="Write here a number (eg. 16.09)"
            className="w-80 mx-auto border-2 rounded-l-md p-2 my-5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
          {errors?.input_user?.type === "pattern" && (
              <p>Alphabetical characters only</p>
            )}
          <button type="submit" className="bg-purple-600 text-white rounded-r-md px-3 h-12">=</button>
        </form> */}

      {/* <div>{data.input_user}</div> */}

      {/* cada vez que se aprete el boton llama al componente GetData */}
      {/* {data.input_user && <GetData input_numero={data.input_user} />} */}
      {/* <GetData input_numero={data.input_user} /> */}






      {/* bullet points */}
      <ul className="list-disc list-inside">
        <li>Propiedades</li>
        <li>Closed forms</li>
        <li>Numerología</li>
      </ul>

      Buscador de dígitos
      {/* form */}

      {/* </div> */}



      {/* closed form https://en.wikipedia.org/wiki/Closed-form_expression 
        a closed-form expression is a mathematical expression that uses a finite number of standard operations.
        It may contain constants, variables, operations and functions (eg. closed form of 16.09 => e^2pilog(2) = 16.090305)
        */}





    </>
  )

}

export default App
