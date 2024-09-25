import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  developers:[],
};

const developersSlice = createSlice({
  name: 'developer',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    addDeveloperSuccess: (state)=>{
        state.error = null;
        state.isLoading = false;
    },
    deleteDeveloperSuccess: (state)=>{
      state.error = null;
      state.isLoading = false;
  },
    editDeveloperSuccess: (state)=>{
      state.error = null;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchDevelopers : (state,action)=>{
      state.isLoading = false;
      state.error = null;
      state.developers = action.payload.result
    }
  },
});

export const { setLoading, addDeveloperSuccess, setError, fetchDevelopers,editDeveloperSuccess,deleteDeveloperSuccess } = developersSlice.actions;
export default developersSlice.reducer;
