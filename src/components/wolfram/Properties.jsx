import { getSubpods, checkSubpods } from '../utils/wolframeUtils'


function raizDigital(numero_entero) {
    let numero_str = numero_entero.toString();

    //devolver null si no es entero
    if (/^\d+$/.test(numero_str) === false) return null;

    let suma_digitos = 0;
    let arraySumasParciales = [];
    arraySumasParciales.push(numero_str);

    while (numero_str.length > 1) {
        suma_digitos = 0;

        for (let i = 0; i < numero_str.length; i++) {
            suma_digitos += parseInt(numero_str[i]);
        }

        arraySumasParciales.push(suma_digitos);
        numero_str = suma_digitos.toString();
    }
    // arraySumasParciales = arraySumasParciales.map(num => num.toString());
    return arraySumasParciales;
}





function Properties({ wolframe_output, input_value, onSubpodData }) {
    const propsSubpods = getSubpods(wolframe_output, "Property")
    const primesSubpods = getSubpods(wolframe_output, "PrimeFactorization")
    const comparitionSubpods = getSubpods(wolframe_output, "Comparison")
    const formatosSubpods = getSubpods(wolframe_output, "RomanNumerals")
    const raizDigitalResult = raizDigital(input_value)

    if (propsSubpods?.length === 0 && primesSubpods?.length === 0 && comparitionSubpods?.length === 0 && formatosSubpods?.length === 0 && raizDigitalResult == null) return (null);
    if (propsSubpods === undefined && primesSubpods === undefined && comparitionSubpods === undefined && formatosSubpods === undefined) return (null);

    return (
        <>
            {checkSubpods("Properties", propsSubpods)}
            {checkSubpods("Prime Factorization", primesSubpods)}
            {checkSubpods("Comparison", comparitionSubpods)}
            {checkSubpods("Writen as other numerals", formatosSubpods)}
            <div className="border-2 my-1 px-3 py-1 rounded-md bg-white">
                <h2>Digital Root</h2>
                <p className="ml-10">The digital root of {input_value} is {raizDigitalResult[raizDigitalResult.length - 1]}
                <span className="text-gray-400"> (because {raizDigitalResult.join(" ➜ ")})</span></p>
            </div>

        </>
    )

}

export default Properties