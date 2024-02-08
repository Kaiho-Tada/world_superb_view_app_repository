require "rails_helper"

RSpec.describe "Api::V1::Videos", type: :request do
  describe "GET /search" do
    describe "video_sortメソッドのテスト" do
      context "sort_criteriaがpopularityの場合" do
        let!(:video1) { create(:video, popularity: 1) }
        let!(:video2) { create(:video, popularity: 2) }
        let!(:video3) { create(:video, popularity: 3) }

        before do
          get api_v1_videos_search_path, params: { sort_criteria: "popularity" }
        end

        it "popularityが高い順にレコードが取得されること" do
          expect(response).to have_http_status(200)
          json = JSON.parse(response.body)
          expect(json.pluck("id")).to eq [video3, video2, video1].pluck(:id)
        end
      end

      context "sort_criteriaがvoteAverageの場合" do
        let!(:video1) { create(:video, vote_average: 1) }
        let!(:video2) { create(:video, vote_average: 2) }
        let!(:video3) { create(:video, vote_average: 3) }

        before do
          get api_v1_videos_search_path, params: { sort_criteria: "voteAverage" }
        end

        it "vote_averageが高い順にレコードが取得されること" do
          expect(response).to have_http_status(200)
          json = JSON.parse(response.body)
          expect(json.pluck("id")).to eq [video3, video2, video1].pluck(:id)
        end
      end

      context "sort_criteriaがreleaseDateの場合" do
        let!(:video1) { create(:video, release_date: 3.days.ago) }
        let!(:video2) { create(:video, release_date: 2.days.ago) }
        let!(:video3) { create(:video, release_date: 1.day.ago) }

        before do
          get api_v1_videos_search_path, params: { sort_criteria: "releaseDate" }
        end

        it "release_dateが遅い順にレコードが取得されること" do
          expect(response).to have_http_status(200)
          json = JSON.parse(response.body)
          expect(json.pluck("id")).to eq [video3, video2, video1].pluck(:id)
        end
      end

      context "sort_criteriaが空文字の場合" do
        let!(:videos) { create_list(:video, 5) }

        before do
          get api_v1_videos_search_path, params: { sort_criteria: "" }
        end

        it "Videoレコードが全件取得できること" do
          expect(response).to have_http_status(200)
          json = JSON.parse(response.body)
          expected_json = videos.as_json(except: %i[created_at updated_at])
          expect(json).to eq expected_json
          expect(json.length).to eq 5
        end
      end

      context "sort_criteriaが不正な場合" do
        it "ArgumentErrorが発生すること" do
          expect do
            get api_v1_videos_search_path, params: { sort_criteria: "invalid_sort_criteria" }
          end.to raise_error(ArgumentError, "Invalid sort criteria: invalid_sort_criteria")
        end
      end
    end
  end
end
