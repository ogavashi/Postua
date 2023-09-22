import { ApiService } from '@/services';
import { PostItem } from '@/types';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useInfiniteScroll = (
  initialData: PostItem[],
  nextPage: boolean | undefined,
  filter: string | undefined,
  api: CallableFunction
) => {
  const [items, setItems] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const [pageOptions, setPageOptions] = useState({
    page: 1,
    hasNextPage: nextPage,
  });

  const observerTarget = useRef(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { posts, meta } = await api({ page: pageOptions.page, take: 2, order: 'ASC' }, filter);

      setPageOptions((prev) => ({ ...prev, hasNextPage: meta.hasNextPage }));
      setItems((prev) => [...prev, ...posts]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [pageOptions, filter, api]);

  useEffect(() => {
    if (pageOptions.page > 1) {
      fetchData();
    }
  }, [pageOptions.page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if ((entries[0].isIntersecting || entries[1]?.isIntersecting) && pageOptions.hasNextPage) {
          setPageOptions((prev) => ({ ...prev, page: prev.page + 1 }));
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, pageOptions.hasNextPage]);

  return {
    items,
    isLoading,
    observerTarget,
  };
};
