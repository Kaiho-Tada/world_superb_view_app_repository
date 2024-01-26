require "rails_helper"

RSpec.describe WorldViewCategory, type: :model do
  describe "関連のテスト" do
    it "world_viewと正しく関連付けされていること" do
      world_view = create(:world_view)
      world_view_category = create(:world_view_category, world_view:)

      expect(world_view_category.world_view).to eq(world_view)
    end

    it "categoryと正しく関連付けされていること" do
      category = create(:category)
      world_view_category = create(:world_view_category, category:)

      expect(world_view_category.category).to eq(category)
    end
  end
end
