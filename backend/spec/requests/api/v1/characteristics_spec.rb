require "rails_helper"

RSpec.describe "Api::V1::Characteristics", type: :request do
  describe "GET /index" do
    it "Characteristicsが全件取得できること" do
      create_list(:characteristic, 5)
      get api_v1_characteristics_path
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json.length).to eq 5
    end

    it "indexアクション内で発生したエラーが適切に処理されること" do
      allow(Characteristic).to receive(:select).and_raise(StandardError, "error message")
      expect(Rails.logger).to receive(:error).with(StandardError)
      expect(Rails.logger).to receive(:error).with("error message")
      expect(Rails.logger).to receive(:error).with(instance_of(String))
      get api_v1_characteristics_path
      json = JSON.parse(response.body)
      expect(response).to have_http_status(500)
      expect(json["error"]).to eq("Characteristicモデルの取得に失敗しました。")
    end
  end
end
