import { FaUsers } from 'react-icons/fa'

function Enquiries() {
  return (
    <div className="w-full flex  text-white bg-[#000000] rounded-[20px]">
        <div className="flex-1  flex flex-col justify-between items-start p-6">
            <h1 className='sf-medium font-medium text-3xl'>Total Enquiries</h1>
            {/* <div className="">
                <h1 className='text-5xl sf-medium font-medium'>5000</h1>
                <p>1200 Enquiries Today</p>
            </div> */}
        </div>
        <div className="flex-1 flex items-center justify-end pe-6">
            <FaUsers size={80}/>
        </div>
    </div>
  )
}

export default Enquiries