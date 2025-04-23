FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["GameReviews.Domain/GameReviews.Domain.csproj", "GameReviews.Domain/"]
COPY ["GameReviews.Application/GameReviews.Application.csproj", "GameReviews.Application/"]
COPY ["GameReviews.Infrastructure/GameReviews.Infrastructure.csproj", "GameReviews.Infrastructure/"]
COPY ["GameReviews.Web/GameReviews.Web.csproj", "GameReviews.Web/"]
RUN dotnet restore "./GameReviews.Web/GameReviews.Web.csproj"
COPY . .
WORKDIR "/src/GameReviews.Web"
RUN dotnet build "./GameReviews.Web.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./GameReviews.Web.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GameReviews.Web.dll"]