function TableDigits(props) {
    return (
        <div className="flex sm:justify-center overflow-auto">
            <table className="table-auto border-2 border-arena-7">
                <thead>
                    <tr className="bg-arena-3">
                        <th className="sm:px-4 sm:py-2 border border-arena-7">Number</th>
                        <th className="sm:px-4 sm:py-2 border border-arena-7">Pattern input</th>
                        <th className="sm:px-4 sm:py-2 border border-arena-7">At Position</th>
                        <th className="sm:px-4 sm:py-2 border border-arena-7">Ocurrences (in the first 1 millon digits)</th>
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