require "rails_helper"

RSpec.describe WorldViewFavorite, type: :model do
  describe "association test" do
    it { is_expected.to belong_to(:world_view) }
    it { is_expected.to belong_to(:user) }
  end

  describe "validations" do
    subject { create(:world_view_favorite, world_view: create(:world_view), user: create(:user)) }
    it { is_expected.to validate_uniqueness_of(:world_view_id).scoped_to(:user_id) }
  end
end
