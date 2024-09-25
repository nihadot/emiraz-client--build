import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  data:[],
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    addBlogSuccess: (state)=>{
        state.error = null;
        state.isLoading = false;
    },
    deleteBlogSuccess: (state)=>{
      state.error = null;
      state.isLoading = false;
  },
    editBlogSuccess: (state)=>{
      state.error = null;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchBlog : (state,action)=>{
      state.isLoading = false;
      state.error = null;
      state.data = action.payload.result
    }
  },
});

export const { setLoading, addBlogSuccess, setError, fetchBlog,editBlogSuccess,deleteBlogSuccess } = blogSlice.actions;
export default blogSlice.reducer;
