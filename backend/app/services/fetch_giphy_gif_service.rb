require "httparty"
require "json"

class FetchGiphyGifService
  include HTTParty
  def call(gif_id)
    url = "https://api.giphy.com/v1/gifs/#{gif_id}"
    options = { query: { api_key: ENV.fetch("GIPHY_API_KEY") } }

    response = self.class.get(url, options)
    if response.success?
      json = JSON.parse(response.body)
      json["data"]["images"]["fixed_height"]["url"]
    else
      Rails.logger.error "Error: #{response.code} - #{response.message}"
    end
  end
end
