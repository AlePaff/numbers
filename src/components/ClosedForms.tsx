import { useState } from "react"

//no hace falta el chequeo de si es entero, decimal o fecha, ya que filter
//si no lo encuentra devuelve un array vacío, y map y flatMap sobre un array vacío no generan problemas
const getSubpods = (wolframe_query, pod_id) => {
    let result = wolframe_query?.pods?.filter(p => p.id === pod_id).flatMap(pod => pod.subpods)
    return result
}

function obtenerError(plain_text, value_input) {
    const regex = /≈(.*)/       //obtiene todo luego del ≈
    const match = plain_text.match(regex)
    if (match === null) return ("")
    //convertir a numero
    const match_num = parseFloat(match[1])
    //error al aproximar
    const error = (Math.abs(1 - match_num / value_input) * 100).toFixed(4)
    return (error + "%")
}

function ClosedForms({ values_wolf, value_input, onSubpodData }) {
    let closedFormsSubpods = getSubpods(values_wolf, "PossibleClosedForm")

    if (closedFormsSubpods.length === 0) { return (<></>) }

    let closedFormsSubpodsImg = closedFormsSubpods.map(subpod => subpod.img);

    const closedFormsSubpodsInfo = closedFormsSubpods.map(subpod => subpod.infos)
        //elimina los undefined
        .filter(info => info !== undefined).flatMap(info => info)


    const [showErrors, setShowErrors] = useState(false);


    return (
        <>
            {/* imagen y texto */}
            <h2>Closed Forms</h2>
            <div className="border-2 m-1 px-3 py-1 rounded-md bg-white sm:grid-cols-[3fr_2fr] sm:grid-rows-[minmax(30px,_auto)] sm:grid">
                <div className="row-start-1 row-end-3">
                    {closedFormsSubpodsImg.map((image) =>
                        <div className="grid grid-cols-[7fr_1fr]" key={image.alt}>
                            <img className="my-2" src={image.src} alt={image.alt} />
                            {showErrors && <div className="self-center justify-self-end">{obtenerError(image.title, value_input)}</div>}
                        </div>
                    )}
                </div>

                {/* boton ocultar mostrar errores */}
                <button onClick={() => setShowErrors(!showErrors)} className="self-start justify-self-end p-1 rounded bg-red-100 hover:bg-red-200">
                    {showErrors ? "Hide error aproximation" : "Show error aproximation"}
                </button>

                {/* info y links */}
                <div className="justify-self-end ">
                    {closedFormsSubpodsInfo.map(info => {
                        if ('links' in info && info.links.length >= 2) {
                            return (
                                <a href={info.links[1].url} target="_blank" key={info.img?.alt}>
                                    <img className="my-2 cursor-pointer" src={info.img.src} alt={info.img.alt} title="Click the image for more info" />
                                </a>
                            );
                        }
                    })}
                </div>
            </div>
        </>
    )
}

export default ClosedForms