import { useGet } from "./useGet";

export const useGetRandomDog = () => {
  const { data, loading, error, refetch } = useGet<string>(
    "/breeds/image/random",
    { method: "GET" },
  );

  return { data, loading, error, refetch };
};
