import React from 'react';
import { useNavigate } from 'react-router-dom';

function AgencyCard({ item,handleDelete }) {

    const navigate = useNavigate();

  return (
    <div className='rounded-2xl border px-4 py-4 text-sm'>
      <div className='poppins-medium  mt-1 overflow-hidden'>
        <h1>
          Name : {item?.name}
        </h1>
      </div>
      <div className='overflow-hidden break-words poppins-medium text-sm text-[#666666] text-left'>
        <p>
         Username : {item?.username}
        </p>
        <p className=''>
         Password : {item?.password}
        </p>
      </div>
      <div className='flex gap-2 mt-3 h-6 text-sm'>
        <button
          onClick={() =>
            navigate(`/admin/edit-agency/${item?._id}`)
          }
          className='flex-1 py-1 flex justify-center items-center rounded-[5px] border border-[#000000] text-[#000000] bg-[#FFFFFF]'
        >
          Edit
        </button>
        <button
          onClick={() => {
            const status = confirm('Are you want to delete!');
            if (status) {
              handleDelete(item?._id);
            }
          }}
          className='flex-1 flex justify-center items-center py-1 rounded-[5px] border border-[#000000]  text-[#ffffff] bg-[#000000]'
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default AgencyCard;
