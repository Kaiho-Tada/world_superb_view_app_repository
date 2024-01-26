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

    it "indexアクション内で発生したエラーが適切に処理されること" do
      allow(Category).to receive(:select).and_raise(StandardError, "error message")
      expect(Rails.logger).to receive(:error).with(StandardError)
      expect(Rails.logger).to receive(:error).with("error message")
      expect(Rails.logger).to receive(:error).with(instance_of(String))
      get api_v1_categories_path
      json = JSON.parse(response.body)
      expect(response).to have_http_status(500)
      expect(json["error"]).to eq("Categoryモデルの取得に失敗しました。")
    end
  end
end
