import { useEffect, useState } from 'react';
import axios from '../../utilities/auth';
import { isAxiosError } from 'axios';

interface UseApiReturnType<T> {
   data: T | null;
   loading: boolean;
   error: Error | null;
}

export const useApi = <T,>(endpoint: string): UseApiReturnType<T> => {
   const [data, setData] = useState<T | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<Error | null>(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get<T>(endpoint);
            setData(response.data);
         } catch (err) {
            if (isAxiosError(err)) {
               setError(err);
               // throw err;
            } else {
               throw new Error(`error: ${err}`);
            }
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [endpoint]);

   return { data, loading, error };
};
