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

  describe ".filter_by_name" do
    let!(:genre1) { create(:genre) }
    let!(:genre2) { create(:genre) }
    it "引数の配列内のnameに一致するレコードが返されること" do
      expect(Genre.filter_by_name([genre1.name])).to include genre1
      expect(Genre.filter_by_name([genre2.name])).to include genre2
      expect(Genre.filter_by_name([genre1.name, genre2.name])).to include genre1, genre2
    end
  end
end
