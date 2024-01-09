require "rails_helper"

RSpec.describe WorldViewFavorite, type: :model do
  describe "関連のテスト" do
    it "world_viewと正しく関連付けされていること" do
      world_view = create(:world_view)
      world_view_favorite = create(:world_view_favorite, world_view:)
      expect(world_view_favorite.world_view).to eq(world_view)
    end

    it "userと正しく関連付けされていること" do
      user = create(:user)
      world_view_favorite = create(:world_view_favorite, user:)
      expect(world_view_favorite.user).to eq(user)
    end
  end

  describe "バリデーションのテスト" do
    let(:user) { create(:user) }
    let(:world_view) { create(:world_view) }
    before do
      create(:world_view_favorite, user:, world_view:)
    end

    it "world_view_idとuser_idの組み合わせが一意であること" do
      duplicate_favorite = build(:world_view_favorite, user:, world_view:)
      expect(duplicate_favorite).not_to be_valid
      expect(duplicate_favorite.errors.full_messages).to eq ["絶景idはすでに存在します"]
    end

    it "異なるユーザー間で同じworld_view_idを使用してもエラーにならないこと" do
      another_user = create(:user)
      another_favorite = build(:world_view_favorite, user: another_user, world_view:)
      expect(another_favorite).to be_valid
    end
  end
end
