function TableDigits(props) {
    return (
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
                    {props.children}
                </tbody>
            </table>
        </div>
    )
}

export default TableDigits