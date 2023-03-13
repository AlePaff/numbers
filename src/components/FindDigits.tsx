import { useState } from "react";

// pongo 41 y me dice que en pi=3.1415 se encuentra en la posición 1
function buscarDigitosDe(numero, constante) {
    const numeroString = numero.toString();
    const constanteString = constante.toString();
    const posicion = constanteString.indexOf(numeroString);
    return posicion;
}


const FindDigits = () => {
    const [digitFinder, setDigitFinder] = useState('')
    const handleDigitFinderChange = (event) => { setDigitFinder(event.target.value) };

    return (
        <div>
            <div className="flex justify-center">
                <input
                    type="number"
                    className="border-2 rounded p-2 my-5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent placeholder:italic placeholder:text-slate-400"
                    placeholder="Write some digits"
                    value={digitFinder}
                    onChange={handleDigitFinderChange}
                />
            </div>
            {digitFinder &&
                <div className='border-2 rounded '>
                    e <br></br>
                    pi

                    {digitFinder}
                </div>
            }
        </div>
    )
}
  
export default FindDigits