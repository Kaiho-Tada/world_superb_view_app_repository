require "httparty"
require "json"

class CreateGenreService
  include HTTParty
  def call(type)
    api_key = ENV.fetch("TMDB_API_KEY")
    url = "https://api.themoviedb.org/3/genre/#{type}/list?api_key=#{api_key}&language=ja"
    response = self.class.get(url)
    if response.success?
      json = JSON.parse(response.body)
      json["genres"].map do |genre|
        Genre.find_or_create_by(name: genre["name"])
      end
    else
      Rails.logger.error "Error: #{response.code} - #{response.message}"
    end
  end
end
