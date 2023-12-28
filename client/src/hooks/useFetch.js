import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); // Clear any previous errors

      try {
        const response = await fetch(url);
        const parsedData = await response.json();
        setData(parsedData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]); // Only refetch when URL change
  return { data, isLoading, error };
}

export default useFetch;
