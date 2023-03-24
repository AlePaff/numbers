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

    //para que pueda leer assets en produccion
    const response = await fetch(import.meta.env.BASE_URL + `assets/${fileNames[constName]}`);
    const text = await response.text();
    const pos = text.indexOf(search);

    return ([
        displayNumber(pos, text, search),
        indexOfSearch(pos),
        numberOfTimes(text, search),
    ])

}

function TableItem({ value, label, display, position, ocurrences }) {
    return (
      <tr>
        <td className="text-center pb-2 font-bold-xl text-2xl">{label}</td>
        
        {display[0] === null ? (
          <td className="text-center pb-2 text-2xl">-</td>
        ) : (
          <td className="text-center pb-2 text-2xl">
            {display[0]}
            <span className="font-bold text-3xl">{value}</span>
            {display[1]}
          </td>
        )}
        
        <td className="text-center pb-2 text-2xl">{position ?? "-"}</td>
        <td className="text-center pb-2 text-2xl">{ocurrences}</td>
      </tr>
    );
  }



const FindDigits = () => {
    const [digit, setDigit] = useState("");

    const [constants, setConstants] = useState({
        pi: { display: [null, null], position: null, ocurrences: null },
        e: { display: [null, null], position: null, ocurrences: null },
        phi: { display: [null, null], position: null, ocurrences: null }
    });

    const constantes = {
        "pi": "π",
        "e": "e",
        "phi": "φ",
    }

    const handleDigitChange = async (event) => {
        setDigit(event.target.value);

        //obtengo las keys de constantes
        const constKeys = Object.keys(constantes);

        const newConstants = {};
        for (const constante of constKeys) {
            // @ts-ignore
            const [display, position, ocurrences] = await buscarInfoDe(event.target.value, constante);
            newConstants[constante] = { display, position, ocurrences };
        }

        // @ts-ignore
        setConstants(newConstants);
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
            <div className="flex sm:justify-center overflow-auto">
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
                        {Object.entries(constantes).map(([key, value]) => (
                            <TableItem
                                key={key}
                                value = {digit}
                                label={value}
                                display={constants[key].display}
                                position={constants[key].position}
                                ocurrences={constants[key].ocurrences}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};



export default FindDigits