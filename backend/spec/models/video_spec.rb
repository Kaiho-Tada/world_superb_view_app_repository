require "rails_helper"

RSpec.describe Video, type: :model do
  describe "associations" do
    it { is_expected.to have_many(:world_view_videos).dependent(:destroy) }
    it { is_expected.to have_many(:world_views).through(:world_view_videos) }
  end

  describe "validations" do
    subject { create(:video) }
    it { is_expected.to validate_presence_of :title }
    it { is_expected.to validate_uniqueness_of(:title).ignoring_case_sensitivity }
    it { is_expected.to validate_presence_of :poster_path }
    it { is_expected.to validate_presence_of :popularity }
    it { is_expected.to validate_presence_of :vote_average }
    it { is_expected.to validate_presence_of :release_date }
  end
end
