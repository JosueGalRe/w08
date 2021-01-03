import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { API, API_AUTH } from 'utils/API';

type useFetchTypes = {
  method?: 'get';
  url: string;
};

const useFetch = <T,>({ url, method = 'get' }: useFetchTypes): [T | null, { error: boolean; body: string }, boolean] => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState({ error: false, body: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      API({ url: url + API_AUTH(), method })
        .then((response: { data: T }): void => {
          setResponse(response.data);
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch((error: AxiosError) => {
          let errorInfo: string;
          if (error.response) {
            errorInfo = `${error.response.status}: ${error.response?.data?.status}`;
          } else if (error.request) {
            errorInfo = error.request;
          } else {
            errorInfo = error.message;
          }
          setError((prevError) => {
            return { ...prevError, error: true, body: errorInfo };
          });
        });
    };

    fetchData();
  }, [url]);

  return [response, error, isLoading];
};

export default useFetch;
