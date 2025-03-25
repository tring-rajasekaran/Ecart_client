import { useState, useEffect, useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_PRODUCTS } from "../graphql/query/productQuery";

export default function useSearchProducts(searchTerm, delay ) {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [products, setProducts] = useState([]);
  const [searchProducts, { loading, data, error }] = useLazyQuery(SEARCH_PRODUCTS, {
    fetchPolicy: "network-only", 
  });

  console.log("Search Term:", searchTerm);
  console.log("Debounced Term:", debouncedTerm);
  console.log("Products:", products);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);

    return () => clearTimeout(handler);
  }, [searchTerm, delay]);

  const fetchProducts = useCallback(() => {
    if (debouncedTerm.trim() !== "") {
      console.log("Fetching products for:", debouncedTerm); 
      searchProducts({ variables: { search: debouncedTerm } });
    } else {
      setProducts([]); 
    }
  }, [debouncedTerm, searchProducts]);

  useEffect(() => {
    fetchProducts();
  }, [debouncedTerm, fetchProducts]);

  useEffect(() => {
    if (data && data.searchProducts) {
      console.log("Fetched Data:", data.searchProducts); 
      setProducts(data.searchProducts);
    }
  }, [data]);

  if (error) {
    console.error("GraphQL Error:", error);
  }

  return { products, loading };
}
