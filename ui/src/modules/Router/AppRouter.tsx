import { Routes, Route } from 'react-router-dom';
import { SignIn, SignUp } from '..';

import { ProtectedRoute } from '.';
import { AllBoards, Board } from '..';

import { useAppSelector } from '../../library/common/hooks';
import { selectUser } from '../../main/store/auth/authSlice';

export const AppRouter = () => {
   const isAuthenticated = useAppSelector(selectUser);

   console.log(isAuthenticated);

   return (
      <Routes>
         <Route path='sign-in' element={<SignIn />} />
         <Route path='sign-up' element={<SignUp />} />

         <Route
            path='/'
            element={
               <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  render={(props) => <AllBoards {...props} />}
               />
            }
         />

         <Route
            path='/:boardName'
            element={
               <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  render={(props) => <Board {...props} />}
               />
            }
         />
      </Routes>
   );
};
