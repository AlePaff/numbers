



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
    let result = wolframe_query?.pods.filter(p => p.id === pod_id).flatMap(pod => pod.subpods).map(subpod => subpod.img);
    return result
}

const checkSubpods = (name, subpod_array) => {
    if (subpod_array.length === 0) return
    return (
        <>
            <li>{name}</li>
            <div className="ml-10">
                {subpod_array.map((image, index) => <img key={index} src={image.src} alt={image.alt} />)}
            </div>
        </>
    )
}


function ParseQuery({ wolframe_output, input_value }) {
    const numero = parseFloat(input_value)

    const propsSubpods = getSubpods(wolframe_output, "Property")
    const primesSubpods = getSubpods(wolframe_output, "PrimeFactorization")
    const comparitionSubpods = getSubpods(wolframe_output, "Comparison")
    const closedFormsSubpods = getSubpods(wolframe_output, "PossibleClosedForm")
    const formatosSubpods = getSubpods(wolframe_output, "RomanNumerals")
    const calendarSubpods = getSubpods(wolframe_output, "SingleDateFormats")
    const timerSubpods = getSubpods(wolframe_output, "DifferenceConversions")


    return (
        <div>
            <ul className="list-disc list-inside">
                {checkSubpods("Properties", propsSubpods)}
                {checkSubpods("Prime Factorization", primesSubpods)}
                {checkSubpods("Comparison", comparitionSubpods)}
                {checkSubpods("Possible Closed Form", closedFormsSubpods)}
                {checkSubpods("Roman Numerals", formatosSubpods)}
                {checkSubpods("Single Date Formats", calendarSubpods)}
                {checkSubpods("Difference Conversions", timerSubpods)}
            </ul>

        </div>
    )
}

export default ParseQuery;