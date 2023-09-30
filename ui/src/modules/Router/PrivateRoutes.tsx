import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../library/common/hooks';
import { selectJwt } from '../../main/store/auth/authSlice';
import { Layout } from '../Layout';

export const PrivateRoutes = () => {
   const isAuthenticated = useAppSelector(selectJwt);

   return isAuthenticated ? (
      <Layout>
         <Outlet />
      </Layout>
   ) : (
      <Navigate to='/sign-in' />
   );
};
