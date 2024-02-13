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

  describe ".sort_by_popularity" do
    let!(:video1) { create(:video, popularity: 1) }
    let!(:video2) { create(:video, popularity: 2) }
    let!(:video3) { create(:video, popularity: 3) }

    it "popularityが高い順にレコードが取得されること" do
      expect(Video.sort_by_popularity).to eq [video3, video2, video1]
    end
  end

  describe ".sort_by_vote_average" do
    let!(:video1) { create(:video, vote_average: 1) }
    let!(:video2) { create(:video, vote_average: 2) }
    let!(:video3) { create(:video, vote_average: 3) }

    it "vote_averageが高い順にレコードが取得されること" do
      expect(Video.sort_by_vote_average).to eq [video3, video2, video1]
    end
  end

  describe ".sort_by_release_date" do
    let!(:video1) { create(:video, release_date: 3.days.ago) }
    let!(:video2) { create(:video, release_date: 2.days.ago) }
    let!(:video3) { create(:video, release_date: 1.day.ago) }

    it "release_dateが遅い順にレコードが取得されること" do
      expect(Video.sort_by_release_date).to eq [video3, video2, video1]
    end
  end

  describe ".filter_by_genre" do
    let!(:video1) { create(:video) }
    let!(:video2) { create(:video) }
    let!(:genre_action) { create(:genre, name: "アクション") }

    before do
      create(:video_genre, video: video1, genre: genre_action)
      create(:video_genre, video: video2, genre: genre_action)
    end

    it "引数の配列に含まれる名前を持つGenreモデルと関連付いたレコードが返されること" do
      expect(Video.filter_by_genre([genre_action.name])).to include video1, video2
    end

    it "返されるレコードが重複しないこと" do
      genre_horror = create(:genre, name: "ホラー")
      create(:video_genre, video: video1, genre: genre_horror)
      create(:video_genre, video: video2, genre: genre_horror)
      result_video = Video.filter_by_genre([genre_action.name, genre_horror.name])
      expect(result_video).to eq result_video.distinct
    end
  end
end
