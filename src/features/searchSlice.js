import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  result:[],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {

    searchResult: (state,action)=>{
      state.result = action.payload;
      console.log(action,'action')
  },
  },
});

export const { searchResult } = searchSlice.actions;
export default searchSlice.reducer;
