using GameReviews.Application.Common.Interfaces.Query;
using GameReviews.Application.Common.Models.Dtos.Review;
using GameReviews.Application.Common.PagedList;
using GameReviews.Domain.Entities.GameAggregate.Entities;

namespace GameReviews.Application.Reviews.Queries.GetReviews;

public record GetReviewsByGameIdQuery(
    GameId GameId,
    int? Page,
    int? PageSize) : IQuery<PagedList<ReviewDetailsDto>>;