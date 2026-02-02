import { useState, useEffect, useCallback } from "react";

export const useBatchGet = <T>(
  serviceFunction: () => Promise<T>,
  autoRun = true,
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(autoRun);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceFunction();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [serviceFunction]);

  useEffect(() => {
    if (autoRun) {
      execute();
    }
  }, [execute, autoRun]);

  return { data, loading, error, refetch: execute };
};
