require "rails_helper"

RSpec.describe "Api::V1::Genres", type: :request do
  describe "GET /index" do
    let!(:genres) { create_list(:genre, 5) }

    before do
      get api_v1_genres_path
    end

    it "レコードが全件取得できること" do
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      expected_json = genres.as_json(only: %i[id name])
      expect(sort_by_id(json)).to eq(sort_by_id(expected_json))
      expect(json.length).to eq 5
    end
  end
end
