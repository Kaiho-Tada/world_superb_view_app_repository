require "rails_helper"

RSpec.describe "Api::V1::Countries", type: :request do
  describe "GET /index" do
    let!(:countries) { create_list(:country, 5) }

    before do
      get api_v1_countries_path
    end

    it "Countriesが全件取得できること" do
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      expected_json = countries.as_json(only: %i[id name region], methods: [:parent])
      expect(json).to contain_exactly(*expected_json)
      expect(json.length).to eq 5
    end
  end
end
