require "httparty"
require "json"

class FetchImgService
  include HTTParty
  def call(img_id)
    url = "https://api.unsplash.com/photos/#{img_id}"
    options = {
      query: {
        client_id: ENV.fetch("UNSPLASH_API_KEY")
      }
    }

    response = self.class.get(url, options)
    if response.success?
      json = JSON.parse(response.body)
      json["urls"]["regular"]
    else
      Rails.logger.error "Error: #{response.code} - #{response.message}"
    end
  end
end
