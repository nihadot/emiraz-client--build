import React from 'react';
import { useNavigate } from 'react-router-dom';

function AgencyCard({ item,handleDelete }) {

    const navigate = useNavigate();

  return (
    <div className='rounded-2xl border px-4 py-4 text-sm'>
      <img src={item?.imageFile?.secure_url} alt="" className='object-contain rounded mb-3 w-full h-[200px]' />
      <div className='poppins-medium  mt-1 overflow-hidden'>
        <h1>
          Name : {item?.name}
        </h1>
      </div>
      <div className='overflow-hidden break-words poppins-medium text-sm text-[#666666] text-left'>
        <p>
         Country : {item?.countryDetails?.countryName}
        </p>
        <p className=''>
        <p className="capitalize">
  Languages: {item?.languageDetails?.sort((a,b)=> b.createdAt - a.createdAt ).map((lang) => lang.languageName).join(', ')}
</p>

{/* {console.log(item?.languageDetails,'item?.languageDetails')} */}

        </p>
      </div>
      <div className='flex gap-2 mt-3 h-8 text-sm'>
        <button
          onClick={() =>
            navigate(`/admin/edit-agent/${item?._id}`)
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
