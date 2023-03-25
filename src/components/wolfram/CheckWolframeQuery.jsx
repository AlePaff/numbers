import ClosedForms from './ClosedForms'
import Properties from './Properties'
import { useState } from 'react';
import DatesAndMore from './DatesAndMore';

function CheckWolframeQuery({ wolframe_output, input_value }) {
    return (
        <>
            <div className="grid"> {/* className="list-disc list-inside" */}
                <ClosedForms values_wolf={wolframe_output} value_input={input_value}></ClosedForms>
                <Properties wolframe_output={wolframe_output} input_value={input_value}></Properties>
                <DatesAndMore wolframe_output={wolframe_output} input_value={input_value}></DatesAndMore>
            </div >
            {/* {notFound && <p className="text-center text-gray-500 my-2">No data found for {input_value}.</p>} */}
        </>
    )
}

export default CheckWolframeQuery;