require "rails_helper"

RSpec.describe Genre, type: :model do
  describe "associations" do
    it { is_expected.to have_many(:video_genres).dependent(:destroy) }
    it { is_expected.to have_many(:videos).through(:video_genres) }
  end

  describe "validations" do
    subject { create(:genre) }
    it { is_expected.to validate_presence_of :name }
    it { is_expected.to validate_uniqueness_of(:name).ignoring_case_sensitivity }
  end
end
