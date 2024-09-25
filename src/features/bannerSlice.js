import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  data:[],
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    addBannerSuccess: (state)=>{
        state.error = null;
        state.isLoading = false;
    },
    deleteBannerSuccess: (state)=>{
      state.error = null;
      state.isLoading = false;
  },
    editBannerSuccess: (state)=>{
      state.error = null;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchBanner : (state,action)=>{
      state.isLoading = false;
      state.error = null;
      state.data = action.payload.result
    }
  },
});

export const { setLoading, addBannerSuccess, setError, fetchBanner,editBannerSuccess,deleteBannerSuccess } = bannerSlice.actions;
export default bannerSlice.reducer;
