import { useSearchParams } from "react-router-dom";
import {
  GameContent,
  GameContentWrapper,
  GameImagesContainer,
  GamePageWrapper,
  InformationSection,
  PlatformImage,
  PlatformsContainer,
} from "./GamePage.styled";
import { Pagination, Skeleton, Typography } from "@mui/material";
import { getFormattedDate, getFormattedImageUrl } from "@/shared/lib";
import { useGameQuery } from "@/entities/game";
import { GameInfoLabel } from "./GameInfoLabel";

const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PlayStation_4_logo_and_wordmark.svg/2560px-PlayStation_4_logo_and_wordmark.svg.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqXHzZgonqBRA6YUsD7bmWoiVuMK7DSF0S1A&s",
  "https://upload.wikimedia.org/wikipedia/commons/d/d9/PlayStation_3_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/XBOX_logo_2012.svg/2560px-XBOX_logo_2012.svg.png",
];

import { useAuth } from "@/entities/auth";
import { TextField, Button, Rating, Box } from "@mui/material";
import { useState } from "react";
import httpClient from "@/shared/api/httpClient";
import { useGameReviewsQuery } from "@/entities/reviews";
import { GameReviewsFilter } from "@/shared/api/types";
import { useGameReviewsFilters } from "@/entities/reviews/lib/useGameReviewsFilters";


export const GamePage = () => {
  const { user } = useAuth();
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState<number | null>(0);
  const { filters, setFilters } = useGameReviewsFilters();

  console.log(filters);

  const queryFilters: GameReviewsFilter = {
    page: filters.page,
    gameId: filters.gameId,
  };

  const { data: gameReviews, isFetching: isLoading } = useGameReviewsQuery(queryFilters);

  const handleReviewSubmit = () => {
    if (!gameId || reviewRating === null) return;

    const reviewPayload = {
      gameId: {value: gameId},
      title: reviewTitle,
      content: reviewContent,
      rating: reviewRating,
    };

    console.log("Submitting review:", reviewPayload);
    
    httpClient.post(import.meta.env.VITE_API_URL + '/reviews', reviewPayload).then(x => {
      setReviewTitle("");
      setReviewContent("");
      setReviewRating(0);
    });
  };

  const [search] = useSearchParams();
  const id = search.get("id");

  const gameId = !isNaN(Number(id)) ? Number(id) : null;
  const { data: game, isFetching, error } = useGameQuery(gameId);

  console.log("gameId: " + gameId);
  if (gameId === null) {
    return <h1>Incorrect URL</h1>;
  }

  if (error) {
    return <h1>Error fetching</h1>;
  }

  if (isFetching || !game) {
    return (
      <GamePageWrapper>
        <GameContentWrapper>
          <Skeleton variant="rounded" width="100%" height={500} />
          <GameContent>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="50%" />
          </GameContent>
        </GameContentWrapper>
        <Skeleton variant="text" width="100%" height={100} />
      </GamePageWrapper>
    );
  }

  console.log("imageUrl: " + game?.screenshots?.at(0)?.url);

  return (
    <GamePageWrapper>
      <GameContentWrapper>
        {game.screenshots && game.screenshots[0] && (
          <GameImagesContainer>
            <img src={getFormattedImageUrl(game.screenshots[0].url, "1080p")} />
          </GameImagesContainer>
        )}
        <GameContent>
          <Typography variant="h3">{game.name}</Typography>
          <PlatformsContainer>
            {logos.map((logo) => (
              <PlatformImage id={logo} src={logo} loading="lazy" />
            ))}
          </PlatformsContainer>
          <InformationSection>
            {game.releaseDate && (
              <GameInfoLabel
                title="Released on:"
                text={getFormattedDate(game.releaseDate)}
              />
            )}
            {game.gammeStatus && (
              <GameInfoLabel title="Status: " text={game.gammeStatus} />
            )}
            {game.category && (
              <GameInfoLabel title="Category:" text={game.category} />
            )}
          </InformationSection>
        </GameContent>
      </GameContentWrapper>
      <Typography>{game.description}</Typography>

      <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Reviews
      </Typography>

      {isLoading ? (
        <Skeleton height={100} variant="rectangular" />
      ) : gameReviews?.items.length === 0 ? (
        <Typography>No reviews yet.</Typography>
      ) : (
        gameReviews?.items?.map((review) => { console.log(review); return (
          <Box key={review.id} border={1} p={2} borderRadius={2} mb={2}>
            <Typography variant="h6">{review.title}</Typography>
            <Rating value={review.rating} readOnly />
            <Typography variant="body2" color="textSecondary">
              by {review.author.username} on{" "}
              {new Date(review.createdAt).toLocaleDateString()}
            </Typography>
            <Typography mt={1}>{review.content}</Typography>
          </Box>
        )})
      )}

      {(gameReviews?.totalCount ?? 0) > 1 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
                count={Math.ceil((gameReviews?.totalCount ?? 0) / (gameReviews?.pageSize ?? 1))}
                onChange={(_, number) =>
                  setFilters({ ...filters, page: number })
                }
                page={filters.page}
              />
        </Box>
      )}
    </Box>

      <Box mt={4}>
  {user ? (
    <>
      <Typography variant="h5" gutterBottom>
        Leave a Review
      </Typography>
      <TextField
        fullWidth
        label="Title"
        variant="outlined"
        value={reviewTitle}
        onChange={(e) => setReviewTitle(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Content"
        multiline
        minRows={4}
        variant="outlined"
        value={reviewContent}
        onChange={(e) => setReviewContent(e.target.value)}
        margin="normal"
      />
      <Box display="flex" alignItems="center" mt={2}>
        <Typography component="legend" sx={{ mr: 2 }}>
          Rating
        </Typography>
        <Rating
          name="rating"
          value={reviewRating}
          onChange={(_, newValue) => setReviewRating(newValue)}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleReviewSubmit}
        sx={{ mt: 2 }}
        disabled={
          !reviewTitle.trim() || !reviewContent.trim() || reviewRating === 0
        }
      >
        Submit Review
      </Button>
    </>
  ) : (
    <Typography color="textSecondary">
      You need to login to write a review.
    </Typography>
  )}
</Box>
    </GamePageWrapper>
  );
};
