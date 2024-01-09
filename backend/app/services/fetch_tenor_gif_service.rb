require "httparty"
require "json"

class FetchTenorGifService
  include HTTParty
  def call(gif_id)
    url = "https://tenor.googleapis.com/v2/posts"
    options = { query: { key: ENV.fetch("TENOR_API_KEY"), ids: gif_id } }
    response = self.class.get(url, options)
    if response.success?
      json = JSON.parse(response.body)
      json["results"][0]["media_formats"]["gif"]["url"]
    else
      Rails.logger.error "Error: #{response.code} - #{response.message}"
    end
  end
end
