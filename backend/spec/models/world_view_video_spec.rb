require "rails_helper"

RSpec.describe WorldViewVideo, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:world_view) }
    it { is_expected.to belong_to(:video) }
  end

  describe "validations" do
    subject { create(:world_view_video, world_view: create(:world_view), video: create(:video)) }
    it { is_expected.to validate_uniqueness_of(:world_view_id).scoped_to(:video_id) }
  end
end
