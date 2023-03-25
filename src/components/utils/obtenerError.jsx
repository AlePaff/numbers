
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



export { obtenerError }