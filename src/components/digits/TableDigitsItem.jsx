

function TableDigitsItem({ value, label, display, position, ocurrences }) {
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

export default TableDigitsItem;