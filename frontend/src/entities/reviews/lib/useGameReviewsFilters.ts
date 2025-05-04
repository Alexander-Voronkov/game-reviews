import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export interface ActualGameReviewsFilters {
  gameId: number;
  page?: number;
}

export const useGameReviewsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = (key: string): string | undefined => {
    console.log('search params', [...searchParams.keys()]);
    const value = searchParams.get(key);
    return value && value.trim() !== "" ? value : undefined;
  };

  const getNumberParam = (key: string) =>
    isNaN(Number(getParam(key))) ? undefined : Number(getParam(key));
  const getParamSet = (key: string) => {
    const paramsArray = searchParams.getAll(key);
    return paramsArray === null ? undefined : new Set<string>(paramsArray);
  };

  const filters: ActualGameReviewsFilters = useMemo(
    () => ({
      gameId: getNumberParam("id")!,
      page: getNumberParam("page") ?? 1,
    }),
    [searchParams]
  );

  console.log("useGameReviewsFilters");
  const setFilters = useCallback((filters: ActualGameReviewsFilters) => {
    setSearchParams((params) => {
      if (filters.gameId !== undefined && !isNaN(filters.gameId)) {
        params.set("Id", filters.gameId.toString());
      }
      if (filters.page !== undefined && !isNaN(filters.page)) {
        params.set("page", filters.page.toString());
      }
      return params;
    });
  }, []);

  return {
    filters,
    setFilters,
  };
};
