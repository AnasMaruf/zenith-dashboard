import $fetch from "@/lib/$fetch";
import { useEffect, useState } from "react";

export default function useGets(url, params) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState();

  async function getData() {
    try {
      setIsLoading(true);
      const response = await $fetch.get(url, params);
      setData(response);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [url, params]);

  return { data, isLoading, isError, error, refresh: getData };
}
