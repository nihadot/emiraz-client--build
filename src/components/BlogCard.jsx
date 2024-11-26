import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { errorToast, successToast } from '../toast';
import { deleteBlogSuccess, setError, setLoading } from '../features/blogSlice';
import { MAIN_IMAG_URL, deleteBlog } from '../api';


function BlogCard( {item, refresh, setRefresh} ) {
    
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleDelete = async (id) => {
    if (!id) return errorToast("Id Is Not Provided!");

    try {
      dispatch(setLoading());
      await deleteBlog(id);
      dispatch(deleteBlogSuccess());
      successToast("Successfully Deleted");
      setRefresh(!refresh);
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(setError(error.response.data.message));
        errorToast(error.response.data.message);
      } else {
        dispatch(setError("An error occurred during login."));
        errorToast("An error occurred during login.");
      }
    }
  };
    
  return (
    <div className='max-w-[360px]  w-[360px] 400px:w-[355px] 640px:w-[-webkit-fill-available] 1300px:w-[380px]  rounded-2xl border px-4 py-4'>
        <div className="w-full h-48 rounded-[10px] overflow-hidden">
            <img src={item?.imageFile?.secure_url} className=' w-full h-full object-cover' alt="" />
        </div>
        <div className="poppins-medium text-2xl text-center mt-1">
            <h1>{item.blogTitle.length > 24 ? item.blogTitle.slice(0,24)+'...' : item.blogTitle }</h1>
        </div>
        <div className="break-words poppins-medium text-sm text-[#666666] text-left mt-3">
            { item.date && <p className='text-[13px] mb-2'>{new Date(item.date).toDateString()}</p>}
            <p>{item.blogBody.length > 134 ? item.blogBody.slice(0,150)+"..." : item.blogBody }</p>
        </div>
        <div className="flex gap-2 mt-3">
            <button onClick={()=>navigate(`/admin/edit-blog/${item._id}`,{state:item})} className='flex-1 py-3 rounded-[5px] border border-[#000000] text-[#000000] bg-[#FFFFFF]'>Edit</button>
            <button
            onClick={() => {
              const status = confirm('Are you want to delete!')
              if(status){

                handleDelete(item._id)
              }
            }}
            className='flex-1 py-3 rounded-[5px] border border-[#000000]  text-[#ffffff] bg-[#000000]'>Delete</button>
        </div>
    </div>
  )
}

export default BlogCard