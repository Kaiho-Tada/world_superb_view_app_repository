require "rails_helper"

RSpec.describe VideoGenre, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:video) }
    it { is_expected.to belong_to(:genre) }
  end

  describe "validations" do
    subject { create(:video_genre, video: create(:video), genre: create(:genre)) }
    it { is_expected.to validate_uniqueness_of(:video_id).scoped_to(:genre_id) }
  end
end
