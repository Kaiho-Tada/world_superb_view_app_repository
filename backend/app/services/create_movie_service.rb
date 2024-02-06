require "httparty"
require "json"

class CreateMovieService
  include HTTParty
  def call(movie_id)
    api_key = ENV.fetch("TMDB_API_KEY")
    url = "https://api.themoviedb.org/3/movie/#{movie_id}?api_key=#{api_key}&language=ja"

    response = self.class.get(url)
    if response.success?
      json = JSON.parse(response.body)
      Movie.create!(title: json["title"], poster_path: json["poster_path"],
                    budget: json["budget"], revenue: json["revenue"], popularity: json["popularity"],
                    vote_average: json["vote_average"], release_date: json["release_date"],
                    status: json["status"], overview: json["overview"])
    else
      Rails.logger.error "Error: #{response.code} - #{response.message}"
    end
  end
end
