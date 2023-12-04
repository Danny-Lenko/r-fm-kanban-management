import { useEffect, useRef, createContext, useContext } from 'react';
import axios from 'axios';

import { apiBaseUrl } from '../library/common/constants';
import { postQueryNames, usePostQuery } from '../library/common/hooks';

type AuthContextType = {
   isAuthenticated: boolean;
   signIn: (reqBody: ISigninBody) => Promise<void>;
};

interface ISigninBody {
   userNameOrEmail: FormDataEntryValue;
   password: FormDataEntryValue;
}

interface ISigninReturn {
   accessToken: string;
}

export const AuthContext = createContext<AuthContextType>({
   isAuthenticated: false,
   signIn: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
   const accessTokenRef = useRef<string>();

   const dataType = postQueryNames.signin;
   const loginQuery = usePostQuery<ISigninBody, ISigninReturn>(dataType);

   const signIn = async (reqBody: ISigninBody) => {
      await loginQuery.mutateAsync(reqBody, {
         onSuccess: (data) => {
            const { accessToken } = data!;
            accessTokenRef.current = accessToken;
            axios.defaults.headers.common[
               'Authorization'
            ] = `Bearer ${accessToken}`;
         },
      });
   };

   useEffect(() => {
      axios.defaults.baseURL = apiBaseUrl;
   }, []);

   const isSuccess = loginQuery.isSuccess;
   const isAuthenticated = isSuccess && !!accessTokenRef.current;

   return (
      <AuthContext.Provider
         value={{
            isAuthenticated,
            signIn,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
}

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (context === undefined) {
      throw new Error('AuthContext must be within AuthProvider');
   }

   return context;
};
