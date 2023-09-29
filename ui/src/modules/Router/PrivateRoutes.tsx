import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../library/common/hooks';
import { selectJwt } from '../../main/store/auth/authSlice';

export const PrivateRoutes = () => {
   const isAuthenticated = useAppSelector(selectJwt);

   return isAuthenticated ? <Outlet /> : <Navigate to='/sign-in' />;
};
