require "rails_helper"

RSpec.describe "Api::V1::SuperbViews", type: :request do
  describe "GET /index" do
    before do
      create_list(:superb_view, 5)
    end
    it "SuperbViewsが全件取得できること" do
      get api_v1_superb_views_path
      @json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(@json.length).to eq 5
    end
  end
end
