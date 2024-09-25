import RecentVector from "../assets/icons/RecentVector.svg"
import FinshedVector from "../assets/icons/FnishedVector.svg"

function Counts() {
  return (
    <div className='flex gap-10 justify-center items-center'>
        <div className="sf-medium font-medium gap-2 flex flex-col justify-center items-center">
            <img src={RecentVector} className='w-6 h-6 object-contain' alt="recent" />
            <h1 className=' text-4xl'>408</h1>
            <span>Unchecked</span>
        </div>
        <div className="sf-medium font-medium flex gap-2 flex-col justify-center items-center">
            <img src={FinshedVector} className='w-7 h-7 object-contain' alt="recent" />
            <h1 className='text-4xl'>408</h1>
            <span>Checked</span>
        </div>
    </div>
  )
}

export default Counts