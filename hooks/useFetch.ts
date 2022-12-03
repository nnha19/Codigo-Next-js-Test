import { useState, useEffect, useCallback } from "react";

function useFetch<T>(page: number) {
  const [prePage, setPrePage] = useState(page);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<T[]>([]);

  const handleFeftch = useCallback(async () => {
    if (prePage === page) return;
    setLoading(true);
    const resp = await fetch(
      `https://www.balldontlie.io/api/v1/players?page=${page}&per_page=10`,
      {}
    );
    const data = await resp.json();
    setList((pre) => pre.concat(data.data));
    setLoading(false);
    setPrePage(page);
  }, [page]);

  useEffect(() => {
    handleFeftch();
  }, [handleFeftch, page]);

  return { loading, list };
}

export default useFetch;
