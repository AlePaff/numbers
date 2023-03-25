import ClosedForms from './ClosedForms'
import Properties from './Properties'
import { useState } from 'react';
import DatesAndMore from './DatesAndMore';



function CheckWolframeQuery({ wolframe_output, input_value }) {
    const [dataFound, setDataFound] = useState(false)

    const onSubpodData = (hasData) => {
        setDataFound(hasData)
    }

    // console.log("aca llegue")
    let closed = <ClosedForms values_wolf={wolframe_output} value_input={input_value}></ClosedForms>
    let prop = <Properties wolframe_output={wolframe_output} input_value={input_value} onSubpodData={onSubpodData}></Properties>
    let dates = <DatesAndMore wolframe_output={wolframe_output} input_value={input_value} onSubpodData={onSubpodData}></DatesAndMore>
    
    // let notFound = closed === (<></>) && prop ===  (<></>) && dates === (<></>)

    return (
        <>
            <div className="grid"> {/* className="list-disc list-inside" */}
                {closed}
                {prop}
                {dates}
            </div >
            {/* {notFound && <p className="text-center text-gray-500 my-2">No data found for {input_value}.</p>} */}
        </>
    )
}

export default CheckWolframeQuery;