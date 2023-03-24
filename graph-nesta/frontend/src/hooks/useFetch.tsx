import { useState, useEffect, useCallback } from "react";
import { getODAproblems } from "../api/odaAPI";
import type { IfetchType, challengeCardProps } from "../types/types";


function useFetch(query:IfetchType, offset: number) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [ODAproblems, setODAproblems] = useState<challengeCardProps[]>([]);

  const sendQuery = useCallback(async (query:IfetchType) => {
    setIsLoading(true);
    let multiplier = 2;
    if(offset===0) {
        multiplier = 1;
    }

      getODAproblems(offset, query.limit*multiplier, query.categoryFilter, query.searchPhrase, query.orderBy)
        .then( res => res.json())
        .then(setODAproblems)
        .catch(() => {setIsError(true)})
        .finally(() => {setIsLoading(false)})
  }, [offset]);

  useEffect(() => {
    sendQuery(query)
        .catch(() => {setIsError(true)})
  }, [query, sendQuery, offset]);

  return { isLoading, isError, ODAproblems };
}

export default useFetch;
