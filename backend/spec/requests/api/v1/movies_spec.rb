require "rails_helper"

RSpec.describe "Api::V1::Movies", type: :request do
  describe "GET /search" do
    it "Movieモデルのレコードが全件取得できること" do
      movies = create_list(:movie, 5)
      get api_v1_movies_search_path
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      expected_json = movies.as_json(except: %i[created_at updated_at])
      expect(json).to eq expected_json
      expect(json.length).to eq 5
    end
  end
end
