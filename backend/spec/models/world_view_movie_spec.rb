require "rails_helper"

RSpec.describe WorldViewMovie, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:world_view) }
    it { is_expected.to belong_to(:movie) }
  end

  describe "validations" do
    subject { create(:world_view_movie, world_view: create(:world_view), movie: create(:movie)) }
    it { is_expected.to validate_uniqueness_of(:world_view_id).scoped_to(:movie_id) }
  end
end
