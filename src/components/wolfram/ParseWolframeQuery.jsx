import ClosedForms from './ClosedForms'
import Properties from './Properties'
import { useState } from 'react';
import DatesAndMore from './DatesAndMore';



function ParseWolframeQuery({ wolframe_output, input_value }) {
    const [dataFound, setDataFound] = useState(false)

    const onSubpodData = (hasData) => {
        setDataFound(hasData)
    }

    return (
        <>
            <div className="grid"> {/* className="list-disc list-inside" */}
                <ClosedForms values_wolf={wolframe_output} value_input={input_value} onSubpodData={onSubpodData}></ClosedForms>

                <Properties wolframe_output={wolframe_output} input_value={input_value} onSubpodData={onSubpodData}></Properties>

                <DatesAndMore wolframe_output={wolframe_output} input_value={input_value} onSubpodData={onSubpodData}></DatesAndMore>
            </div >

            {/* {!dataFound && <p className="text-center text-gray-500 my-2">No data found for {input_value}.</p>} */}
        </>
    )
}

export default ParseWolframeQuery;