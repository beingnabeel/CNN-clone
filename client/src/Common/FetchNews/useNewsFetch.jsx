// useNewsFetch.js
import { useState, useEffect } from "react";
import axios from "axios";

const useNewsFetch = (category, subcategory, type, tag, limit, order) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};

        // Add category and subcategory to params if available
        if (category) {
          params.category = category;
          if (subcategory) {
            params.subcategory = subcategory;
          }
        }

        // Add type and tag to params if available
        if (type) {
          params.type = type;
        }
        if (tag) {
          params.tag = tag;
        }

        // Add limit to params if available
        if (limit) {
          params.limit = limit;
        }
        if (order) {
          params.order = order;
        }

        // Fetch data with params
        const response = await axios.get("http://localhost:8080/api/news", {
          params,
        });
        setData(response.data);
      } catch (error) {
        setError("Error fetching data");
      }
      setLoading(false);
    };

    fetchData();
  }, [category, subcategory, type, tag, limit, order]);

  return { data, loading, error };
};

export default useNewsFetch;
