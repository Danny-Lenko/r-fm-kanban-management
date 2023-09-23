import { Route, Navigate, PathRouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends PathRouteProps {
   isAuthenticated: null | Record<string, string>;
   // isAuthenticated: boolean;
   render: (props: any) => React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
   render,
   isAuthenticated,
   ...rest
}) => {
   return isAuthenticated ? <>{render(rest)}</> : <Navigate to='/sign-in' />;
};
