import ClosedForms from './ClosedForms'
// import Properties from './Properties'


//por ejemplo 4356 -> 4 + 3 + 5 + 8 = 20 -> 2 + 0 = 2
function raizDigital(numero_entero) {
    const numero = numero_entero.toString();
    if (numero.length === 1) {
        return numero;
    }
    const suma_digitos = numero.split('').reduce((a, b) => parseInt(a) + parseInt(b));
    console.log(suma_digitos)
    return raizDigital(suma_digitos);
}

// pongo 41 y me dice que en pi=3.1415 se encuentra en la posición 1
function buscarDigitosDe(numero, constante) {
    const numeroString = numero.toString();
    const constanteString = constante.toString();
    const posicion = constanteString.indexOf(numeroString);
    return posicion;
}






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

                        <div className="flex">
                            <img className="my-2" key={image.alt} src={image.src} alt={image.alt} />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}


function Properties({ wolframe_output, input_value, onSubpodData }) {
    const numero = parseFloat(input_value)

    const propsSubpods = getSubpods(wolframe_output, "Property")
    const primesSubpods = getSubpods(wolframe_output, "PrimeFactorization")
    const comparitionSubpods = getSubpods(wolframe_output, "Comparison")
    const formatosSubpods = getSubpods(wolframe_output, "RomanNumerals")

    if (propsSubpods.length === 0 && primesSubpods.length === 0 && comparitionSubpods.length === 0 && formatosSubpods.length === 0) return (<></>)
    onSubpodData()

    return (
        <>

            {checkSubpods("Properties", propsSubpods)}
            {checkSubpods("Prime Factorization", primesSubpods)}
            {checkSubpods("Comparison", comparitionSubpods)}
            {checkSubpods("Writen as other numerals", formatosSubpods)}
        </>
    )

}


function DatesAndMore({ wolframe_output, input_value, onSubpodData }) {    

    const calendarSubpods = getSubpods(wolframe_output, "SingleDateFormats")
    const timerSubpods = getSubpods(wolframe_output, "DifferenceConversions")

    if (calendarSubpods.length === 0 && timerSubpods.length === 0) return (<></>)
    onSubpodData()

    return (
        <>
            {checkSubpods("Single Date Formats", calendarSubpods)}
            {checkSubpods("Difference Conversions", timerSubpods)}
        </>
    )
}


function ParseQuery({ wolframe_output, input_value }) {
    let dataFound = false;

    const onSubpodData = () => {
        console.log("primero", dataFound)
        dataFound = true;
        console.log("final", dataFound)
    }

    return (
        <div>
            <div className="grid"> {/* className="list-disc list-inside" */}
                <ClosedForms values_wolf={wolframe_output} value_input={input_value} onSubpodData={onSubpodData}></ClosedForms>

                <Properties wolframe_output={wolframe_output} input_value={input_value} onSubpodData={onSubpodData}></Properties>

                <DatesAndMore wolframe_output={wolframe_output} input_value={input_value} onSubpodData={onSubpodData}></DatesAndMore>
            </div >

            {!dataFound && <p className="text-center text-gray-500 my-2">No data found for {input_value}.</p>}

            

        </div>
    )
}

export default ParseQuery;