import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../library/common/hooks';
import { selectUser } from '../../main/store/auth/authSlice';

export const PrivateRoutes = () => {
   const isAuthenticated = useAppSelector(selectUser);

   return isAuthenticated ? <Outlet /> : <Navigate to='/sign-in' />;
};
