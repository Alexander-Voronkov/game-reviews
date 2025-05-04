import { PagedList } from "@/shared/api";
import httpClient from "@/shared/api/httpClient";
import { GameReviewInfoDto, GameReviewsFilter } from "@/shared/api/types";
import { buildQueryString } from "@/shared/lib";
import { useQuery } from "@tanstack/react-query";

const GAMES_SLATE_TIME = 60000;

const fetchGameReviews = async (filters: GameReviewsFilter, signal: AbortSignal) => {
  const queryString = buildQueryString(filters);
  console.log("quueryString: " + queryString);
  const { data } = await httpClient.get<PagedList<GameReviewInfoDto>>(
    `/reviews?${queryString}`,
    { signal }
  );
  console.log("games data: " + data.items);
  return data;
};

export const useGameReviewsQuery = (filters: GameReviewsFilter) => {
  return useQuery<PagedList<GameReviewInfoDto>>({
    queryKey: ["games", filters],
    queryFn: async ({ signal }) => await fetchGameReviews(filters, signal),
    enabled: true,
    refetchOnWindowFocus: false,
    staleTime: GAMES_SLATE_TIME,
  });
};
