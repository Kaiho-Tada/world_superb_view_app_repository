require "rails_helper"

RSpec.describe WorldViewCountry, type: :model do
  describe "関連のテスト" do
    it "world_viewと正しく関連付けされていること" do
      world_view = create(:world_view)
      world_view_country = create(:world_view_country, world_view:)
      expect(world_view_country.world_view).to eq(world_view)
    end

    it "countryと正しく関連付けされていること" do
      country = create(:country)
      world_view_country = create(:world_view_country, country:)

      expect(world_view_country.country).to eq(country)
    end
  end
end
