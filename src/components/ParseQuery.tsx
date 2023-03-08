



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
const getSubpodsInfo = (wolframe_query, pod_id) => {
    let info = getSubpods(wolframe_query, pod_id).map(subpod => subpod.infos)
        //elimina los undefined
        .filter(info => info !== undefined).flatMap(info => info)
    return info
}


const checkSubpods = (name, subpod_array) => {
    if (subpod_array.length === 0) return
    subpod_array = subpod_array.map(subpod => subpod.img);

    return (
        <>
            <div className="border-2 my-1 px-3 py-1 rounded-md">
                <li>{name}</li>
                <div className="ml-10">
                    {subpod_array.map((image, index) =>

                        <div className="flex">
                            <img className="my-2" key={index} src={image.src} alt={image.alt} />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}


function DecimalNumbers({ values_wolf, value_input }) {
    let closedFormsSubpods = getSubpods(values_wolf, "PossibleClosedForm")
    if (closedFormsSubpods.length === 0) return (<></>)
    let closedFormsSubpodsImg = closedFormsSubpods.map(subpod => subpod.img);

    const closedFormsSubpodsInfo = closedFormsSubpods.map(subpod => subpod.infos)
        //elimina los undefined
        .filter(info => info !== undefined).flatMap(info => info)


    function obtenerError(plain_text, value_input){
        const regex = /≈(.*)/
        const match = plain_text.match(regex)
        if (match === null) return ("")
        //convertir a numero
        const match_num = parseFloat(match[1])
        //error al aproximar
        const error = (Math.abs(1 - match_num / value_input) * 100).toFixed(4)
        return (error + "%")
    }

    return (
        <>
            {/* imagen y texto */}
            <div className="border-2 m-1 px-3 py-1 rounded-md sm:grid-cols-[3fr_2fr] sm:grid">
                <div>
                    {closedFormsSubpodsImg.map((image) =>
                        <div className="grid grid-cols-[3fr_1fr]">
                            <img className="my-2" src={image.src} alt={image.alt} />
                            {/* <div className="self-center justify-self-end">{obtenerError(image.title, value_input)}</div> */}
                        </div>
                    )}
                </div>

                {/* info y links */}
                <div className="justify-self-end">
                    {closedFormsSubpodsInfo.map(info =>
                        <a href={info.links[1].url} target="_blank">
                            <img className="my-2 cursor-pointer" src={info.img.src} alt={info.img.alt} title="Click the image for more info" />
                        </a>
                    )}
                </div>
            </div>
        </>
    )
}




function ParseQuery({ wolframe_output, input_value }) {
    const numero = parseFloat(input_value)


    const propsSubpods = getSubpods(wolframe_output, "Property")
    const primesSubpods = getSubpods(wolframe_output, "PrimeFactorization")
    const comparitionSubpods = getSubpods(wolframe_output, "Comparison")
    const formatosSubpods = getSubpods(wolframe_output, "RomanNumerals")
    // raiz digital

    const calendarSubpods = getSubpods(wolframe_output, "SingleDateFormats")
    const timerSubpods = getSubpods(wolframe_output, "DifferenceConversions")


    return (
        <div>
            <div className="grid"> {/* className="list-disc list-inside" */}
                <DecimalNumbers values_wolf={wolframe_output} value_input={numero}></DecimalNumbers>

                {checkSubpods("Properties", propsSubpods)}
                {checkSubpods("Prime Factorization", primesSubpods)}
                {checkSubpods("Comparison", comparitionSubpods)}
                {checkSubpods("Writen as other numerals", formatosSubpods)}
                {checkSubpods("Single Date Formats", calendarSubpods)}
                {checkSubpods("Difference Conversions", timerSubpods)}
            </div >
            {/* Si no encontró ningun dato */}
            {[propsSubpods, primesSubpods, comparitionSubpods, formatosSubpods, calendarSubpods, timerSubpods].every(subpods => subpods.length === 0) && <p>No se encontraron resultados, intente otra busqueda</p>}
        </div>
    )
}

export default ParseQuery;