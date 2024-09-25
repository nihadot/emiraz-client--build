import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import propertiesSlice from '../features/propertiesSlice';
import citiesSlice from '../features/citiesSlice';
import blogSlice from '../features/blogSlice';
import bannerSlice from '../features/bannerSlice';
import developerSlice from '../features/developerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    property:propertiesSlice,
    city:citiesSlice,
    blog:blogSlice,
    banner:bannerSlice,
    developer:developerSlice,
  },
});
