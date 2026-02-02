import type { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface UseGetResponse<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  refetch: () => void;
}

export const useGet = <T>(
  url: string,
  config?: AxiosRequestConfig,
  skip = false,
): UseGetResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    if (skip) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<T>(url, {
          ...config,
          signal: controller.signal,
        });
        setData(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          setError(err as AxiosError);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [url, skip, config, trigger]);

  const refetch = useCallback(() => {
    setTrigger((prev) => prev + 1);
  }, []);

  return { data, loading, error, refetch };
};
