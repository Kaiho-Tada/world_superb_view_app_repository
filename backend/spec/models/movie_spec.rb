require "rails_helper"

RSpec.describe Movie, type: :model do
  describe "associations" do
    it { is_expected.to have_many(:world_view_movies).dependent(:destroy) }
    it { is_expected.to have_many(:world_views).through(:world_view_movies) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of :title }
    it { is_expected.to validate_presence_of :poster_path }
    it { is_expected.to validate_presence_of :budget }
    it { is_expected.to validate_presence_of :revenue }
    it { is_expected.to validate_presence_of :popularity }
    it { is_expected.to validate_presence_of :vote_average }
    it { is_expected.to validate_presence_of :release_date }
    it { is_expected.to validate_presence_of :status }
  end
end
