require "httparty"
require "json"

class CreateVideoService
  include HTTParty
  def call(params)
    api_key = ENV.fetch("TMDB_API_KEY")
    id = params[:id]
    type = params[:type]

    response = fetch_tmdb_data(api_key, id, type)

    if response.success?
      json = JSON.parse(response.body)
      genre_name = fetch_genre_name(json)
      genres = Genre.where(name: genre_name)
      video_params = build_video_params(json, type, genres)
      Video.create!(video_params)
    else
      Rails.logger.error "Error: #{response.code} - #{response.message}"
    end
  end

  private

  def fetch_tmdb_data(api_key, id, type)
    url = "https://api.themoviedb.org/3/#{type}/#{id}?api_key=#{api_key}&language=ja"
    self.class.get(url)
  end

  def fetch_genre_name(json)
    json["genres"].pluck("name")
  end

  def build_video_params(json, type, genres)
    {
      title: json[type == "movie" ? "title" : "name"],
      poster_path: json["poster_path"],
      popularity: json["popularity"],
      vote_average: json["vote_average"],
      release_date: json[type == "movie" ? "release_date" : "first_air_date"],
      overview: json["overview"],
      budget: json["budget"],
      revenue: json["revenue"],
      is_movie: (type == "movie"),
      genres:
    }
  end
end
