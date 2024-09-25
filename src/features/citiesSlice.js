import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  data:[],
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    addCitiesSuccess: (state)=>{
        state.error = null;
        state.isLoading = false;
    },
    deleteCitiesSuccess: (state)=>{
      state.error = null;
      state.isLoading = false;
  },
    editCitiesSuccess: (state)=>{
      state.error = null;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchCities : (state,action)=>{
      state.isLoading = false;
      state.error = null;
      state.data = action.payload.result
    }
  },
});

export const { setLoading, addCitiesSuccess, setError, fetchCities,editCitiesSuccess,deleteCitiesSuccess } = citiesSlice.actions;
export default citiesSlice.reducer;
