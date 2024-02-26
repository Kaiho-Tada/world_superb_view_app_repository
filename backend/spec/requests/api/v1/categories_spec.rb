require "rails_helper"

RSpec.describe "Api::V1::Categories", type: :request do
  describe "GET /index" do
    it "Categoriesが全件取得できること" do
      categories = create_list(:category, 5)
      get api_v1_categories_path
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      expected_json = categories.as_json(only: %i[id name classification], methods: [:parent])
      expect(json).to eq expected_json
      expect(json.length).to eq 5
    end
  end
end
