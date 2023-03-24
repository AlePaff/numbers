import { useState } from 'react';
import WolframeQuery from './wolfram/WolframeQuery';
import FindDigits from './digits/FindDigits';


function Switch() {
  const [switchState, setSwitchState] = useState(true)
  const handleSwitch = () => {
    setSwitchState(!switchState)
  }

  return (
    <>
      <div className="sm:container mx-2">
        <div className="flex justify-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" onChange={handleSwitch}></input>
            <div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-2 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e6d4ae]  after:bg-white after:border-gray-300 after:border  peer-checked:after:border-white bg-[#e9e2d3] peer-focus:ring-[#e6decd] "></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Find digits</span>
          </label>
        </div>


        {switchState ?
          <WolframeQuery></WolframeQuery>
          :
          <FindDigits></FindDigits>
        }

      </div>
    </>
  );
}

export default Switch;