import { Navigate, Outlet } from 'react-router-dom';
import { Layout } from '../Layout';
import { useAuth } from '../../main/AuthProvider';

export const PrivateRoutes = () => {
   const { isAuthenticated } = useAuth();

   return isAuthenticated ? (
      <Layout>
         <Outlet />
      </Layout>
   ) : (
      <Navigate to='/sign-in' />
   );
};
