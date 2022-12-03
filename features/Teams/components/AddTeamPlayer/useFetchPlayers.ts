import { useState, useEffect, useRef, useCallback } from "react";
import useFetch from "../../../../hooks/useFetch";
import { Player } from "../../../../types";

const useFetchPlayers = () => {
  const [page, setPage] = useState(1);
  const { loading, list } = useFetch<Player>(page);
  const loader = useRef(null);

  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return { loading, list, loader };
};

export default useFetchPlayers;
