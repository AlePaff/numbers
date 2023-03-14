import { useState } from "react";


//imprimir por pantalla la posición y 4 digitos antes y despues
//con verificaciones si llegó al principio o al final del numero
function displayNumber(pos, text, search) {
    if (pos < 0) return [null, null]

    const JUMPNUMBER = 5;

    const posAnterior = pos - JUMPNUMBER;
    const posPosterior = pos + search.length + JUMPNUMBER;
    const posAnteriorValida = posAnterior >= 0 ? posAnterior : 0;
    const posPosteriorValida = posPosterior <= text.length ? posPosterior : text.length;
    const textoAnterior = text.substring(posAnteriorValida, pos);       //si es negativo, empieza desde el principio
    const textoPosterior = text.substring(pos + search.length, posPosteriorValida);     //si es mayor que el largo, termina al final

    //poner un "..." a delante y detras si no llegó al principio o al final
    const textoAnteriorFinal = posAnteriorValida === 0 ? textoAnterior : "..." + textoAnterior;
    const textoPosteriorFinal = posPosteriorValida === text.length ? textoPosterior : textoPosterior + "...";

    return [textoAnteriorFinal, textoPosteriorFinal]
}



const indexOfSearch = (pos) => {
    return pos === -1 ? null : pos;
}

//contar cuantas veces aparece el numero en el texto
const numberOfTimes = (text, search) => {
    const regex = new RegExp(search, "g");
    const count = (text.match(regex) || []).length;     //el operador || es para que no de error si no encuentra nada
    return count;
}


// pongo 41 y me dice que en pi=3.1415 se encuentra en la posición 1
async function buscarInfoDe(search, constName) {
    const fileNames = {
        pi: "1M-pi.txt",
        e: "1M-e.txt",
        phi: "1M-phi.txt",
    };

    if (!(constName in fileNames)) return null;

    const response = await fetch(`src/assets/${fileNames[constName]}`);
    const text = await response.text();
    const pos = text.indexOf(search);

    return ([
        displayNumber(pos, text, search),
        indexOfSearch(pos),
        numberOfTimes(text, search),
    ])

}



const FindDigits = () => {
    const [digit, setDigit] = useState("");

    const [piPosition, setPiPosition] = useState(null);
    const [piDisplay, setPiDisplay] = useState([null, null]);
    const [piOcurrences, setPiOcurrences] = useState(null);

    const [ePosition, setEPosition] = useState(null);
    const [eDisplay, setEDisplay] = useState([null, null]);
    const [eOcurrences, setEOcurrences] = useState(null);

    const [phiPosition, setPhiPosition] = useState(null);
    const [phiDisplay, setPhiDisplay] = useState([null, null]);
    const [phiOcurrences, setPhiOcurrences] = useState(null);

    const constantes = {
        pi: { name: "pi", label: "π" },
        e: { name: "e", label: "e" },
        phi: { name: "phi", label: "φ" },
    }

    const handleDigitChange = async (event) => {
        setDigit(event.target.value);

        // @ts-ignore
        const [displayPi, posPi, ocurrPi] = await buscarInfoDe(event.target.value, "pi");
        setPiPosition(posPi);
        setPiDisplay(displayPi);
        setPiOcurrences(ocurrPi);

        const [displayE, posE, ocurrE] = await buscarInfoDe(event.target.value, "e");
        setEPosition(posE);
        setEDisplay(displayE);
        setEOcurrences(ocurrE);

        const [displayPhi, posPhi, ocurrPhi] = await buscarInfoDe(event.target.value, "phi");
        setPhiPosition(posPhi);
        setPhiDisplay(displayPhi);
        setPhiOcurrences(ocurrPhi);
    };

    return (
        <div>
            <div className="flex justify-center">
                <input
                    type="number"
                    className="border-2 rounded-md p-2 my-5 focus:outline-none focus:ring-2 focus:ring-[#e5cf9b] border-[#e6decd] focus:border-transparent placeholder:italic placeholder:text-slate-400"
                    placeholder="Write some digits"
                    value={digit}
                    onChange={handleDigitChange}
                />
            </div>
            <div className="flex justify-center">
                <table className="table-auto border-2 border-[#e6decd]">
                    <thead>
                        <tr className="bg-[#f1ede3]">
                            <th className="sm:px-4 sm:py-2 border border-[#e6decd]">Number</th>
                            <th className="sm:px-4 sm:py-2 border border-[#e6decd]">Pattern input</th>
                            <th className="sm:px-4 sm:py-2 border border-[#e6decd]">At Position</th>
                            <th className="sm:px-4 sm:py-2 border border-[#e6decd]">Ocurrences (in the first 1 millon digits)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-center pb-2 text-2xl">{constantes["pi"].label}</td>
                            {
                                piDisplay[0] === null ? <td className="text-center pb-2 text-2xl">-</td> :
                                    <td className="text-center pb-2 text-2xl">{piDisplay[0]}<span className="font-bold text-3xl">{digit}</span>{piDisplay[1]}</td>
                            }
                            <td className="text-center pb-2 text-2xl">{piPosition ?? "-"}</td>
                            <td className="text-center pb-2 text-2xl">{piOcurrences}</td>
                        </tr>
                        <tr>
                            <td className="text-center pb-2 font-bold-xl text-2xl">{constantes["e"].label}</td>
                            {
                                eDisplay[0] === null ? <td className="text-center pb-2 text-2xl">-</td> :
                                    <td className="text-center pb-2 text-2xl">{eDisplay[0]}<span className="font-bold text-3xl">{digit}</span>{eDisplay[1]}</td>
                            }
                            <td className="text-center pb-2 text-2xl">{ePosition ?? "-"}</td>
                            <td className="text-center pb-2 text-2xl">{eOcurrences}</td>
                        </tr>
                        <tr>
                            <td className="text-center pb-2 font-bold-xl text-2xl">{constantes["phi"].label}</td>
                            {
                                phiDisplay[0] === null ? <td className="text-center pb-2 text-2xl">-</td> :
                                    <td className="text-center pb-2 text-2xl">{phiDisplay[0]}<span className="font-bold text-3xl">{digit}</span>{phiDisplay[1]}</td>
                            }
                            <td className="text-center pb-2 text-2xl">{phiPosition ?? "-"}</td>
                            <td className="text-center pb-2 text-2xl">{phiOcurrences}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};



export default FindDigits