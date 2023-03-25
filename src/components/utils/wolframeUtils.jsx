

//no hace falta el chequeo de si es entero, decimal o fecha, ya que filter
//si no lo encuentra devuelve un array vacío, y map y flatMap sobre un array vacío no generan problemas
const getSubpods = (wolframe_query, pod_id) => {
    let result = wolframe_query?.pods?.filter(p => p.id === pod_id).flatMap(pod => pod.subpods)
    return result
}

const InfoButtonLink = () => {
    return (
        <button className="text-white px-2 rounded-md mx-2 bg-arena-1 hover:bg-arena-2">?</button>
    )
}

// se fija si el subpod tiene un img, si no lo tiene, no lo muestra
const checkSubpods = (name, subpod_array) => {
    if (subpod_array.length === 0) return null
    subpod_array = subpod_array.map(subpod => subpod.img);

    return (
        <>
            <div className="border-2 my-1 px-3 py-1 rounded-md bg-white">
                <div className="flex">
                    {name}
                    <InfoButtonLink></InfoButtonLink>
                </div>
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


export { getSubpods, checkSubpods } 