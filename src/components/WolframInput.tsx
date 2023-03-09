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
    console.log("link query ", api)

    const resultados = <ParseQuery wolframe_output={data.queryresult} input_value={inputValue} />
    return resultados;
  }, {
    enabled: false,
  });

  //para permitir que el usuario presione enter
  const onFormSubmit = (event) => {
    event.preventDefault();
  }

  const handleChange = (event) => { setInputValue(event.target.value) };
  const handleClick = () => {
    if (!inputValue) return  //si input esta vacio

    //si el input es el mismo que el anterior
    if(query.data && query.data.props?.input_value === inputValue) return
    

    query.refetch();
  };

  return (
    <>
      <div className="sm:container mx-2">
        <form className="flex flex-no-wrap items-center sm:w-3/4 mx-auto" onSubmit={onFormSubmit}>
          <input
            type="text"
            className="flex-grow border-2 rounded-l-md p-2 my-5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent placeholder:italic placeholder:text-slate-400"
            placeholder="Write here a number (eg. 16.09)"
            value={inputValue}
            onChange={handleChange}
          />
          <button
            type='submit'
            className="flex-shrink-0 bg-purple-600 text-white hover:bg-purple-700 rounded-r-md px-3 h-12"
            onClick={handleClick}
          >=</button>

          <button>
            <span className='mx-3' role="img" aria-label="dice">🎲</span>
          </button>
        </form>

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