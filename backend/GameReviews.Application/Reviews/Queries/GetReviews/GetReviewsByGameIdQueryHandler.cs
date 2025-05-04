using AutoMapper;
using AutoMapper.QueryableExtensions;
using GameReviews.Application.Common.Constants;
using GameReviews.Application.Common.Interfaces;
using GameReviews.Application.Common.Interfaces.Query;
using GameReviews.Application.Common.Models.Dtos.Review;
using GameReviews.Application.Common.Models.ReadEntities;
using GameReviews.Application.Common.PagedList;
using GameReviews.Domain.Results;
using Microsoft.EntityFrameworkCore;

namespace GameReviews.Application.Reviews.Queries.GetReviews;

public class GetReviewsByGameIdQueryHandler : IQueryHandler<GetReviewsByGameIdQuery, PagedList<ReviewDetailsDto>>
{
    private readonly IReadApplicationDbContext _context;
    private readonly IMapper _mapper;
    
    public GetReviewsByGameIdQueryHandler(IReadApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<Result<PagedList<ReviewDetailsDto>>> Handle(GetReviewsByGameIdQuery request, CancellationToken cancellationToken)
    {
        IQueryable<ReviewReadEntity> query = _context.Reviews
            .Include(r => r.Game)
            .Include(r => r.Author)
            .Where(x => x.GameId == request.GameId);

        return await PagedList<ReviewDetailsDto>.CreateWithQueryAsync(
            query.ProjectTo<ReviewDetailsDto>(_mapper.ConfigurationProvider),
            request.Page ?? 1,
            request.PageSize ?? PagingDefaults.FilterPageSize,
            cancellationToken);
    }
}