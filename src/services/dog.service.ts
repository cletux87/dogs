import client from "../api/axiosClient";

export interface ISingleDogResponse {
  message: string;
  status: string;
}

export const getRandomDogImage = async (): Promise<string> => {
  try {
    const response = await client.get<ISingleDogResponse>(
      "/breeds/image/random",
    );
    return response.data.message;
  } catch (error) {
    throw new Error("Failed to fetch random dog image", error as Error);
  }
};

export const getRandomDogImages = async (count: number): Promise<string[]> => {
  try {
    const requests = Array.from({ length: count }, () =>
      client.get<ISingleDogResponse>("/breeds/image/random"),
    );
    const responses = await Promise.all(requests);
    return responses.map((response) => response.data.message);
  } catch (error) {
    throw new Error("Failed to fetch random dog images", error as Error);
  }
};
