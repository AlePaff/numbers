import { useState } from "react"
import { getSubpods, InfoButtonLink } from "../utils/wolframeUtils"
import { obtenerError } from "../utils/obtenerError"


function ClosedForms({ values_wolf, value_input, onSubpodData }) {
    let closedFormsSubpods = getSubpods(values_wolf, "PossibleClosedForm")

    if (closedFormsSubpods?.length === 0 || closedFormsSubpods === undefined) return null

    let closedFormsSubpodsImg = closedFormsSubpods.map(subpod => subpod.img);
    const closedFormsSubpodsInfo = closedFormsSubpods.map(subpod => subpod.infos)
        .filter(info => info !== undefined).flatMap(info => info)       //elimina los undefined

    const [showErrors, setShowErrors] = useState(false);


    return (
        <>

            {/* imagen y texto */}
            <div className="border-2 m-1 px-3 py-1 rounded-md bg-white">
                <div className="flex">
                    <h2>Closed Forms</h2>
                    <InfoButtonLink link="https://en.wikipedia.org/wiki/Closed-form_expression"></InfoButtonLink>
                </div>
                <div className="pt-2 ml-5 sm:grid-cols-[3fr_3fr] sm:grid-rows-[minmax(30px,_auto)] sm:grid">

                    <div className="row-start-1 row-end-3">
                        {closedFormsSubpodsImg.map((image) =>
                            <div className="grid grid-cols-[7fr_1fr]" key={image.alt}>
                                <img className="my-2" src={image.src} alt={image.alt} />
                                {showErrors && <div className="self-center justify-self-end pr-3">{obtenerError(image.title, value_input)}</div>}
                            </div>
                        )}
                    </div>

                    {/* boton ocultar mostrar errores */}
                    <button onClick={() => setShowErrors(!showErrors)} className="self-start justify-self-end sm:mt-0 mt-5 p-1 rounded bg-red-100 hover:bg-red-200">
                        {showErrors ? "Hide error aproximation" : "Show error aproximation"}
                    </button>

                    {/* info y links */}
                    <div className="justify-self-end ">
                        {closedFormsSubpodsInfo.map(info => {
                            let value_links = info.links?.url || info.links?.filter(link => link.text === "Definition")[0].url;
                            if ('links' in info && value_links !== undefined) {
                                return (
                                    <a href={value_links} target="_blank" key={info.img?.alt}>
                                        <img className="my-2 cursor-pointer" src={info.img.src} alt={info.img.alt} title="Click the image for more info" />
                                    </a>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClosedForms