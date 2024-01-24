require "rails_helper"

RSpec.describe "Api::V1::Countries", type: :request do
  describe "GET /index" do
    it "Countriesが全件取得できること" do
      countries = create_list(:country, 5)
      get api_v1_countries_path
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      expected_json = countries.as_json(only: %i[id name region], methods: [:parent])
      expect(json).to eq expected_json
      expect(json.length).to eq 5
    end

    it "indexアクション内で発生したエラーが適切に処理されること" do
      allow(Country).to receive(:select).and_raise(StandardError, "error message")
      expect(Rails.logger).to receive(:error).with(StandardError)
      expect(Rails.logger).to receive(:error).with("error message")
      expect(Rails.logger).to receive(:error).with(instance_of(String))
      get api_v1_countries_path
      json = JSON.parse(response.body)
      expect(response).to have_http_status(500)
      expect(json["error"]).to eq("Countryモデルの取得に失敗しました。")
    end
  end
end
