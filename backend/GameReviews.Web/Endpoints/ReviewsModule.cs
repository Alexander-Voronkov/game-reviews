using Carter;
using GameReviews.Application.Common;
using GameReviews.Application.Common.Models.Dtos.Review;
using GameReviews.Application.Common.PagedList;
using GameReviews.Application.Reviews.Commands.CreateReview;
using GameReviews.Application.Reviews.Queries.GetReviews;
using GameReviews.Application.Reviews.Queries.GetUserReviews;
using GameReviews.Domain.Common.Authorization;
using GameReviews.Domain.Entities.GameAggregate.Entities;
using GameReviews.Web.Extensions;
using MediatR;

namespace GameReviews.Web.Endpoints;
public class ReviewsModule : CarterModule
{
    private const string ReviewsBasePath = "/reviews";
    public ReviewsModule() : base(ReviewsBasePath)
    {
    }

    public override void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/", async (CreateReviewCommand command, ISender sender) => 
                (await sender.Send(command)).OkOrProblemDetails())
            .RequireAuthorization(new[] { Permission.ReadUser.ToString() })
            .Produces<ReviewDetailsDto>();
        
        app.MapGet("/", async (long gameId, int? page, int? pageSize, ISender sender) => 
                (await sender.Send(new GetReviewsByGameIdQuery(new GameId(gameId), page, pageSize))).OkOrProblemDetails())
            .RequireAuthorization(new[] { Permission.ReadUser.ToString() })
            .Produces<PagedList<ReviewDetailsDto>>();
    }
}