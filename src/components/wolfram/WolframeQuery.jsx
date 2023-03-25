import { useState } from 'react';
import { useQuery } from 'react-query';
import CheckWolframeQuery from './CheckWolframeQuery';

const WolframeQuery = () => {

  const more_closed_forms = "&podstate=PossibleClosedForm__More"
  // const images = "&format=image"    //sin necesidad de latex ni nada
  const api_id = "XLPLQ9-WVTJ4GL8WU"
  const roman = "&podstate=RomanNumerals__Other+historical+numerals"
  const formatos = "&podstate=SingleDateFormats__More+formats/calendars"

  const [inputValue, setInputValue] = useState('');

  const query = useQuery('wolfram', async () => {
    let api = `https://api.wolframalpha.com/v2/query?input=${inputValue}&output=JSON&appid=${api_id}${formatos}${more_closed_forms}${roman}`
    //permitir politicas de CORS
    const ownProxyUrl = 'https://cors-anywhere-j7yr.onrender.com/';    //default: https://cors-anywhere.herokuapp.com/
    const response = await fetch(ownProxyUrl + api);

    const data = await response.json();     //await se usa para esperar a que la promesa se resuelva
    
    const resultados = <CheckWolframeQuery wolframe_output={data.queryresult} input_value={inputValue} />
    return resultados;
  }, {
    enabled: false,
  });

  
  //para permitir que el usuario presione enter
  const onFormSubmit = (event) => { event.preventDefault(); }
  const handleChange = (event) => { setInputValue(event.target.value) };
  const handleClick = () => {
    if (!inputValue) return  //si input esta vacio     
    if (query.data && query.data.props?.input_value === inputValue) return      //si el input es el mismo que el anterior  

    query.refetch();
  };


  const [isAnimated, setIsAnimated] = useState(false);
  const handleRandom = () => {
    //animacion al clickear
    setIsAnimated(true);
    setTimeout(() => {
      setIsAnimated(false);
    }, 1000);

    const decideType = Math.random()
    const random = Math.random()

    //random decimal from 0 to 100, cut to 4 decimals
    if (decideType < 0.33) setInputValue((random * 100).toFixed(4).toString())
    //random integer from 1 to 5m
    else if (decideType < 0.66) setInputValue(Math.floor((random * (5000000 - 1) + 1)).toString())
    //choose random date
    else setInputValue(Math.floor((random * (28 - 1) + 1)).toString() + "-" + Math.floor((random * (12 - 1) + 1)).toString() + "-" + Math.floor((random * (2023 - 1) + 1)).toString())
  }

  return (

    <div>

      <form className="flex flex-no-wrap items-center sm:w-3/4 mx-auto" onSubmit={onFormSubmit}>
        <input
          type="text"
          className="flex-grow border-2 rounded-l-md p-2 my-5 border-arena-7 focus:outline-none focus:ring-2 focus:ring-arena-1 focus:border-transparent placeholder:italic placeholder:text-slate-400"
          placeholder="Write a number (eg. 16.09)"
          value={inputValue}
          onChange={handleChange}
        />
        <button
          type='submit'
          className="flex-shrink-0 bg-arena-1 text-white hover:bg-arena-2 rounded-r-md px-3 h-12"
          onClick={handleClick}
        >=</button>

        <button onClick={handleRandom}>
          <span
            className={`mx-3 inline-block ${isAnimated ? 'animate-double-spin' : 'animate-none'}`}
            role="img"
            aria-label="dice">🎲</span>

        </button>
      </form>
      <div>
        {(query.isLoading || query.isFetching) && <div>
          <div className="flex items-center justify-center">
            <svg className="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </div>
        </div>}
        {query.isSuccess && !(query.isLoading || query.isFetching) && <div>{query.data}</div>}
        {query.isError && <div>Error: {query.error.message}</div>}
      </div>
    </div>
  )
}

export default WolframeQuery