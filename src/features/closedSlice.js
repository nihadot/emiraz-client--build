import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
  count:0,
};

const closedSlice = createSlice({
  name: 'closedEnquiries',
  initialState,
  reducers: {
    fetchRequestToLoad: (state, action) => {
      state.user = action.payload;
    },
    toLoadClosedEnquiriesCount:(state, action) => {
      state.count = action.payload;
    }
   
  },
});

export const { fetchRequestToLoad,toLoadClosedEnquiriesCount } = closedSlice.actions;
export default closedSlice.reducer;
