import { getSubpods, checkSubpods } from '../utils/wolframeUtils'


function DatesAndMore({ wolframe_output, input_value, onSubpodData }) {

    const calendarSubpods = getSubpods(wolframe_output, "SingleDateFormats")
    const timerSubpods = getSubpods(wolframe_output, "DifferenceConversions")
    const timerDifSubpods = getSubpods(wolframe_output, "TimeDifferenceFromNow (time)")

    if (calendarSubpods?.length === 0 && timerSubpods?.length === 0 && timerDifSubpods?.length === 0) return (<></>);
    if( calendarSubpods === undefined && timerSubpods === undefined && timerDifSubpods === undefined) return (<></>);

    return (
        <>
            {checkSubpods("Single Date Formats", calendarSubpods)}
            {checkSubpods("Difference Conversions", timerSubpods)}
            {checkSubpods("TimeDifferenceFromNow (time)", timerDifSubpods)}
        </>
    )
}

export default DatesAndMore