import { useEffect, useState } from 'react';
import axios from '../../utilities/auth';
import { AxiosError } from 'axios';

interface UseApiReturnType<T> {
   data: T | null;
   loading: boolean;
   error: Error | null;
}

const useApi = <T,>(endpoint: string): UseApiReturnType<T> => {
   const [data, setData] = useState<T | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<Error | null>(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get<T>(endpoint);
            setData(response.data);
         } catch (err) {
            setError(err as AxiosError);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [endpoint]);

   return { data, loading, error };
};

export default useApi;
