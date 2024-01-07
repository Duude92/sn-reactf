import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import EditProfile from './components/EditProfile';
import { FetchData } from "./components/FetchData";
import PhotoView from './components/PhotoView';
import Posts from './components/Posts';
import PostViewFull from './components/PostViewFull';
import Profile from './components/Profile';

const AppRoutes = [
  {
    path: '/',
    index: true,
    element: <Posts />
  },
  {
    path: '/fetch-data',
    requireAuth: true,
    element: <FetchData />
  },
  {
    path: '/posts/:id/',
    element: <PostViewFull />,
    child: [{
      path: 'photo/:photoid',
      element: <PhotoView />,
    },
    ]
  },
  {
    path: '/:name',
    element: <Profile />
  },
  {
    path: '/:name/editprofile',
    element: <EditProfile />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
