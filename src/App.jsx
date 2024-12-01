import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  LoginPage,
  AdminLayout,
  AdminDashBoard,
  AdminEnquiries,
  ManageProperties,
  AddProperties,
  EditProperties,
  EditProperty,
  AddCityPage,
  EditCitiesPage,
  EditCityPage,
  ManageBlogPage,
  AddBlogPage,
  EditBlogsPage,
  EditBlogPage,
  AddBannerPage,
  EditBannerPage,
  ManageBannerPage,
  EditBannersPage,
  AddDeveloperPage,
  ViewDevelopersPage,
  EditDeveloperPage,
  UserProjects,
  AdminNotificationPage,
  ManageDevelopersPage,
  AgencyLoginPage,
  AgencyDashboard,
  AgencyEnquiriesPage,
  AdminEditPropertyPage,
  AdminPropertyEditDetailsPage,
  AdminPropertyEditImagesPage,
  AdminPropertyOtherEditPage,
  AdminPropertyAdsViewPage,
  AdminViewAllAdsPage,

  // users
  UserHome,
  UserAbout,
  UserBlog,
  UserBlogDetails,
  UserAllProjects,
  UserViewProjects,
  TermsAndConditions,
  PrivacyPolicy,
  OurSellers,
  AddBannerClient,
  AddClient,
  EditBannerClient,
  EditClient,
  ViewBannerClient,
  ViewClient,
  DeveloperLoginPage,
  UserAllCities,
  AddPropertyTypePage,
  ViewPropertyTypePage,
  EditPropertyTypePage,
  UserViewCityBasedProjects,
  UserDevelopers,
  AdminAddNotificationPage,
  AdminEditNotificationPage,
  AdminViewNotificationPage,
  ViewSoldProjectsPage,
  AgencyLayoutPage,
  // sidebars
  ViewSideBar,
  AddSideBar,
  EditSideBar,
  DashboardPageAdmin,
  // agency
  AdminAgencyPage,
  AdminAddAgencyPage,
  AdminEditAgencyPage,
  AdminViewAgencyPage,
  AdminEditPage,

} from './Routes';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Offline from './components/Offline/Offline';
import 'react-phone-input-2/lib/style.css';

import Dummy from "./Dummy"

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const updateOnlineStatus = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener('offline', updateOnlineStatus);
    window.addEventListener('online', updateOnlineStatus);

    return () => {
      window.removeEventListener('offline', updateOnlineStatus);
      window.addEventListener('online', updateOnlineStatus);
    };
  }, [isOnline]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/admin-login' element={<LoginPage />} />
          <Route path='dummy' element={<Dummy />} />

          <Route path='/admin' element={<AdminLayout />}>
            {/* agency */}
            <Route path='manage-agent' element={<AdminAgencyPage />} />
            <Route path='add-agencies' element={<AdminAddAgencyPage />} />
            <Route path='view-agencies' element={<AdminViewAgencyPage />} />
            <Route path='edit-agency/:id' element={<AdminEditAgencyPage />} />

            {/* agency */}
            {/* <Route path='dashboard' element={<AdminDashBoard />} /> */}

            <Route path='notifications' element={<AdminNotificationPage />} />
            <Route
              path='add-notification'
              element={<AdminAddNotificationPage />}
            />
            <Route
              path='edit-notification/:id'
              element={<AdminEditNotificationPage />}
            />
            <Route
              path='view-notification'
              element={<AdminViewNotificationPage />}
            />
            <Route path='enquiries' element={<AdminEnquiries />} />
            <Route path='manage-projects' element={<ManageProperties />} />
            <Route path='add-properties' element={<AddProperties />} />
            <Route path='edit-properties' element={<EditProperties />} />
            <Route path='edit-property-page/:userId' element={<AdminEditPropertyPage />} />
            <Route path='edit-details/:userId' element={<AdminPropertyEditDetailsPage />} />
            <Route path='edit-images/:userId' element={<AdminPropertyEditImagesPage />} />
            <Route path='edit-assignments/:projectId' element={<AdminPropertyOtherEditPage />} />
            <Route path='ads/view-ads/:projectId' element={<AdminPropertyAdsViewPage />} />
            <Route path='view-all-ads' element={<AdminViewAllAdsPage />} />
            
            <Route path='edit-property/:id' element={<AdminEditPage />} />
            <Route path='add-city' element={<AddCityPage />} />
            <Route path='edit-cities' element={<EditCitiesPage />} />
            <Route path='edit-citiy/:id' element={<EditCityPage />} />
            <Route path='manage-blog' element={<ManageBlogPage />} />
            <Route
              path='manage-developers'
              element={<ManageDevelopersPage />}
            />
            <Route path='add-blog' element={<AddBlogPage />} />
            <Route path='edit-blogs' element={<EditBlogsPage />} />
            <Route path='edit-blog/:id' element={<EditBlogPage />} />
            <Route path='add-banner' element={<AddBannerPage />} />
            <Route path='manage-banner' element={<ManageBannerPage />} />
            <Route path='edit-banner/:id' element={<EditBannerPage />} />
            <Route path='edit-banners' element={<EditBannersPage />} />
            <Route path='sold-projects' element={<ViewSoldProjectsPage />} />

            <Route path='edit-developer/:id' element={<EditDeveloperPage />} />
            <Route path='add-developer' element={<AddDeveloperPage />} />
            {/* <Route path="developers" element={<ViewDevelopersPage />} /> */}
            <Route path='developers' element={<ViewDevelopersPage />} />
            <Route path='add-banner-client' element={<AddBannerClient />} />
            <Route path='add-client' element={<AddClient />} />
            <Route
              path='edit-banner-client/:id'
              element={<EditBannerClient />}
            />
            <Route path='edit-client/:id' element={<EditClient />} />
            <Route path='dashboard' element={<DashboardPageAdmin />} />
            <Route path='view-banner-client' element={<ViewBannerClient />} />
            <Route path='view-client' element={<ViewClient />} />

            {/* add sidebar */}
            <Route path='view-side-banner' element={<ViewSideBar />} />
            <Route path='add-side-banner' element={<AddSideBar />} />
            {/* <Route path="ads-manage" element={<AdsManagePage />} /> */}
            <Route path='edit-side-banner/:id' element={<EditSideBar />} />
            {/* add sidebar */}

            {/* add property type */}
            <Route path='add-property-type' element={<AddPropertyTypePage />} />
            {/* view property type */}
            <Route
              path='view-property-type'
              element={<ViewPropertyTypePage />}
            />
            <Route
              path='edit-property-type/:id'
              element={<EditPropertyTypePage />}
            />
            
          </Route>

          {/* developer */}
          <Route path='/developer-login' element={<DeveloperLoginPage />} />

          {/* user */}
          <Route index element={<UserHome />} />
          <Route path='/about' element={<UserAbout />} />
          <Route path='/blog' element={<UserBlog />} />
          <Route path='/blog/:id/:name' element={<UserBlogDetails />} />
          <Route
            path='/property-type/:name'
            element={<UserAllProjects />}
          />
          <Route path='/property/:name/:id' element={<UserViewProjects />} />
          <Route
            path='/cproperty/:id/:name'
            element={<UserViewCityBasedProjects />}
          />
          <Route path='/terms-conditions' element={<TermsAndConditions />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/our-developers' element={<OurSellers />} />
          <Route path='/all-cities' element={<UserAllCities />} />

          <Route path='/developers/:id/:name' element={<UserDevelopers />} />

          <Route path='/projects' element={<UserProjects />} />

          {/* agency route */}
          {/* agency route */}
          <Route path='/agent-login' element={<AgencyLoginPage />} />
          <Route path='/agent-dashboard' element={<AgencyLayoutPage />}>
            <Route path='enquiries' element={<AgencyEnquiriesPage />} />
          </Route>

          {/* agency route */}
        </Routes>
        <Toaster position='top-center' reverseOrder={false} />
      </BrowserRouter>
    </>
  );
}

export default App;
