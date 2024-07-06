import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch() {
  const [data, setData] = useState([]);
  const [isLOading, setLoading] = useState(false);
  const [Error, serErorr] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://localhost:7120/api/Product");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      serErorr(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData;
  },[]);

  const refetch=()=>{
    setLoading(true);
    fetchData()
  }
  return{data,isLOading,Error,refetch}
}
