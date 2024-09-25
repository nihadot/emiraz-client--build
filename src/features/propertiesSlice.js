import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  data:[],
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    addPropertySuccess: (state)=>{
        state.error = null;
        state.isLoading = false;
    },
    deletePropertySuccess: (state)=>{
      state.error = null;
      state.isLoading = false;
  },
    editPropertySuccess: (state)=>{
      state.error = null;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchProperties : (state,action)=>{
      state.isLoading = false;
      state.error = null;
      state.data = action.payload.result
    }
  },
});

export const { setLoading, addPropertySuccess, setError, fetchProperties,editPropertySuccess,deletePropertySuccess } = propertiesSlice.actions;
export default propertiesSlice.reducer;
