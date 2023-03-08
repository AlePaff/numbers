import { useState } from 'react';
import { useQuery } from 'react-query';
import ParseQuery from './ParseQuery';



function WolframInput() {
  const more_closed_forms = "&podstate=PossibleClosedForm__More"
  const images = "&format=image"    //sin necesidad de latex ni nada
  const api_id = "XLPLQ9-WVTJ4GL8WU"
  const roman = "&podstate=RomanNumerals__Other+historical+numerals"
  const formatos = "&podstate=SingleDateFormats__More+formats/calendars"

  const [inputValue, setInputValue] = useState('');

  const query = useQuery('wolfram', async () => {
    let api = `https://api.wolframalpha.com/v2/query?input=${inputValue}&output=JSON&appid=${api_id}${formatos}${more_closed_forms}${roman}`
    const response = await fetch(api);
    const data = await response.json();     //await se usa para esperar a que la promesa se resuelva
    console.log("los datos de la query fueron ", data.queryresult)
    console.log("link api ", api)

    const resultados = <ParseQuery wolframe_output={data.queryresult} input_value={inputValue} />
    return resultados;
  }, {
    enabled: false,
  });


  const handleChange = (event) => { setInputValue(event.target.value) };
  const handleClick = () => {
    if (!inputValue) return  //si input esta vacio

    query.refetch();
  };

  return (
    <>
      <div className="sm:container mx-2">
        <div className="flex flex-no-wrap items-center sm:w-3/4 mx-auto">
          <input
            type="text"
            className="flex-grow border-2 rounded-l-md p-2 my-5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            value={inputValue}
            onChange={handleChange}
          />
          <button
            className="flex-shrink-0 bg-purple-600 text-white hover:bg-purple-700 rounded-r-md px-3 h-12"
            onClick={handleClick}
          >=</button>

          <button>
            <span className='mx-3' role="img" aria-label="dice">🎲</span>
          </button>
        </div>

        <div>
          {(query.isLoading || query.isFetching) && <div>Loading...</div>}
          {query.isSuccess && !(query.isLoading || query.isFetching) && <div>{query.data}</div>}
          {query.isError && <div>Error: {query.error.message}</div>}
        </div>
      </div>
    </>
  );
}

export default WolframInput;