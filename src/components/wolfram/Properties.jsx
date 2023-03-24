import { getSubpods, checkSubpods } from '../utils/wolframeUtils'

function Properties({ wolframe_output, input_value, onSubpodData }) {
    const numero = parseFloat(input_value)

    //por ejemplo 4356 -> 4 + 3 + 5 + 8 = 20 -> 2 + 0 = 2
    function raizDigital(numero_entero) {
        const numero_str = numero_entero.toString();
        
        //devolver false si no es entero
        if (!Number.isInteger(numero_entero)) return (null);
        // if (!isInteger(numero_entero)) return (null);      //si no es entero

        if (numero_str.length === 1) {          //si es un solo digito
            return numero_str;
        }
        const suma_digitos = numero_str.split('').reduce((a, b) => parseInt(a) + parseInt(b));
        // console.log(suma_digitos)
        return raizDigital(suma_digitos);
    }

    const propsSubpods = getSubpods(wolframe_output, "Property")
    const primesSubpods = getSubpods(wolframe_output, "PrimeFactorization")
    const comparitionSubpods = getSubpods(wolframe_output, "Comparison")
    const formatosSubpods = getSubpods(wolframe_output, "RomanNumerals")
    const raizDigitalResult = raizDigital(numero)

    if (propsSubpods.length === 0 && primesSubpods.length === 0 && comparitionSubpods.length === 0 && formatosSubpods.length === 0) return (null);

    // onSubpodData(true)

    return (
        <>
            {checkSubpods("Properties", propsSubpods)}
            {checkSubpods("Prime Factorization", primesSubpods)}
            {checkSubpods("Comparison", comparitionSubpods)}
            {checkSubpods("Writen as other numerals", formatosSubpods)}
            <div className="border-2 my-1 px-3 py-1 rounded-md bg-white">
                <h2>Digital Root</h2>
                <p className="ml-10">The digital root of {numero} is {raizDigitalResult}</p>
            </div>

        </>
    )

}

export default Properties