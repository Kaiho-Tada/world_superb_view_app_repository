require "rails_helper"

RSpec.describe "Api::V1::Countries", type: :request do
  describe "GET /index" do
    before do
      create_list(:country, 5)
    end
    it "Countriesが全件取得できること" do
      get api_v1_countries_path
      @json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(@json.length).to eq 5
    end
  end
end
