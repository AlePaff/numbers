import { useState } from 'react';
import { useQuery } from 'react-query';
import ParseQuery from './ParseQuery';



// pongo 41 y me dice que en pi=3.1415 se encuentra en la posición 1
function buscarDigitosDe(numero, constante) {
  const numeroString = numero.toString();
  const constanteString = constante.toString();
  const posicion = constanteString.indexOf(numeroString);
  return posicion;
}




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
  const onFormSubmit = (event) => { event.preventDefault(); }
  const handleChange = (event) => { setInputValue(event.target.value) };
  const handleClick = () => {
    if (!inputValue) return  //si input esta vacio     
    if (query.data && query.data.props?.input_value === inputValue) return      //si el input es el mismo que el anterior  

    query.refetch();
  };

  const [switchState, setSwitchState] = useState(true)
  const handleSwitch = () => {
    setSwitchState(!switchState)
  }



  const handleRandom = () => {
    const decideType = Math.random()
    const random = Math.random()

    //random decimal from 0 to 100, cut to 4 decimals
    if (decideType < 0.33) setInputValue((random * 100).toFixed(4).toString())
    //random integer from 1 to 5m
    else if (decideType < 0.66) setInputValue(Math.floor((random * (5000000 - 1) + 1)).toString())
    //choose random date
    else setInputValue(Math.floor((random * (28 - 1) + 1)).toString() + "-" + Math.floor((random * (12 - 1) + 1)).toString() + "-" + Math.floor((random * (2023 - 1) + 1)).toString())
  }


  const [digitFinder, setDigitFinder] = useState('')
  const handleDigitFinderChange = (event) => { setDigitFinder(event.target.value) };

  return (
    <>

      <div className="sm:container mx-2">

        <div className="flex justify-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" onChange={handleSwitch}></input>
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Find digits</span>
          </label>
        </div>


        {switchState ?
          <div>

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

              <button onClick={handleRandom}>
                <span className='mx-3' role="img" aria-label="dice">🎲</span>

              </button>
            </form>
            <div>
              {(query.isLoading || query.isFetching) && <div>
                <div className="flex items-center justify-center">
                  <svg className="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </div>
              </div>}
              {query.isSuccess && !(query.isLoading || query.isFetching) && <div>{query.data}</div>}
              {query.isError && <div>Error: {query.error.message}</div>}

            </div>
          </div>

          :

          <div className="sm:container mx-2">
            <input
              type="text"
              className="flex-grow border-2 rounded-l-md p-2 my-5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent placeholder:italic placeholder:text-slate-400"
              placeholder="Write here a digit"
              value={digitFinder}
              onChange={handleDigitFinderChange}
            />
            <div>{digitFinder}</div>
          </div>
        }

      </div>
    </>
  );
}

export default WolframInput;