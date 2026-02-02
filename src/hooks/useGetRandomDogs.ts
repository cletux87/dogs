import { useCallback } from "react";
import { getRandomDogImages } from "../services/dog.service";
import { useBatchGet } from "./useBatchGet";

export const useGetRandomDogs = (count: number) => {
  const fetchDogs = useCallback(async () => {
    return getRandomDogImages(count);
  }, [count]);

  const { data, loading, error, refetch } = useBatchGet<string[]>(
    fetchDogs,
    true,
  );
  return { data, loading, error, refetch };
};
