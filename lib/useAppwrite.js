import { useState, useEffect } from "react";
import { Alert } from "react-native";

const useAppWrite = (fn) => {
  const [data, SetData] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);

  const fetchData = async () => {
    SetIsLoading(true);
    try {
      const response = await fn();
      SetData(response);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      SetIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppWrite;
