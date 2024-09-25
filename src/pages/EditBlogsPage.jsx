import React from 'react'
import BlogCard from "../components/BlogCard.jsx"
import { useDispatch, useSelector } from 'react-redux';
import { errorToast } from '../toast';
import { fetchBlog, setError, setLoading } from '../features/blogSlice.js';
import { getBlogs } from '../api/index.js';


function EditBlogsPage() {

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.blog); 
  const [refresh,setRefresh] = React.useState(true);

  React.useEffect(()=>{
    fetchdata()
  },[refresh])

  const fetchdata =async ()=>{
    try {
      dispatch(setLoading());
      const response = await getBlogs()
      dispatch(fetchBlog(response));

    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(setError(error.response.data.message));
        errorToast(error.response.data.message)
      } else {
        dispatch(setError('An error occurred during login.'));
        errorToast('An error occurred during login.');
      }
    }
    }

  return (
    <div className='grid grid-cols-3'>
        {data.map((item)=> <BlogCard refresh={refresh} setRefresh={setRefresh} key={item._id} item={item} /> )}
    </div>
  )
}

export default EditBlogsPage