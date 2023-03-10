import ClosedForms from './ClosedForms'
// import Properties from './Properties'
import { useState } from 'react';






//no hace falta el chequeo de si es entero, decimal o fecha, ya que filter
//si no lo encuentra devuelve un array vacío, y map y flatMap sobre un array vacío no generan problemas
const getSubpods = (wolframe_query, pod_id) => {
    let result = wolframe_query?.pods?.filter(p => p.id === pod_id).flatMap(pod => pod.subpods)
    return result
}


const checkSubpods = (name, subpod_array) => {
    if (subpod_array.length === 0) return
    subpod_array = subpod_array.map(subpod => subpod.img);

    return (
        <>
            <div className="border-2 my-1 px-3 py-1 rounded-md">
                <li>{name}</li>
                <div className="ml-10">
                    {subpod_array.map(image =>
                        <div className="flex" key={image.src + image.alt}>
                            <img className="my-2" src={image.src} alt={image.alt} />
                            {/* la key de esa forma queda bastante unica */}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}


function Properties({ wolframe_output, input_value, onSubpodData }) {
    const numero = parseFloat(input_value)

    //por ejemplo 4356 -> 4 + 3 + 5 + 8 = 20 -> 2 + 0 = 2
    function raizDigital(numero_entero) {
        const numero_str = numero_entero.toString();
        
        if (!(Number as any).isInteger(numero_entero)) return (null);      //si no es entero

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
            <div className="border-2 my-1 px-3 py-1 rounded-md">
                <h2>Digital Root</h2>
                <p className="ml-10">The digital root of {numero} is {raizDigitalResult}</p>
            </div>

        </>
    )

}


function DatesAndMore({ wolframe_output, input_value, onSubpodData }) {

    const calendarSubpods = getSubpods(wolframe_output, "SingleDateFormats")
    const timerSubpods = getSubpods(wolframe_output, "DifferenceConversions")
    const timerDifSubpods = getSubpods(wolframe_output, "TimeDifferenceFromNow (time)")

    if (calendarSubpods.length === 0 && timerSubpods.length === 0 && timerDifSubpods.length === 0) return (null);

    // onSubpodData(true)

    return (
        <>
            {checkSubpods("Single Date Formats", calendarSubpods)}
            {checkSubpods("Difference Conversions", timerSubpods)}
            {checkSubpods("TimeDifferenceFromNow (time)", timerDifSubpods)}
        </>
    )
}


function ParseQuery({ wolframe_output, input_value }) {
    const [dataFound, setDataFound] = useState(false)

    const onSubpodData = (hasData) => {
        setDataFound(hasData)
    }

    return (
        <>
            <div className="grid"> {/* className="list-disc list-inside" */}
                <ClosedForms values_wolf={wolframe_output} value_input={input_value} onSubpodData={onSubpodData}></ClosedForms>

                <Properties wolframe_output={wolframe_output} input_value={input_value} onSubpodData={onSubpodData}></Properties>

                <DatesAndMore wolframe_output={wolframe_output} input_value={input_value} onSubpodData={onSubpodData}></DatesAndMore>
            </div >

            {/* {!dataFound && <p className="text-center text-gray-500 my-2">No data found for {input_value}.</p>} */}
        </>
    )
}

export default ParseQuery;