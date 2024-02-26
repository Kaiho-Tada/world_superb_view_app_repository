require "rails_helper"

RSpec.describe "Api::V1::Characteristics", type: :request do
  describe "GET /index" do
    it "Characteristicsが全件取得できること" do
      characteristics = create_list(:characteristic, 5)
      get api_v1_characteristics_path
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      expected_json = characteristics.as_json(only: %i[id name])
      expect(json).to eq expected_json
      expect(json.length).to eq 5
    end
  end
end
