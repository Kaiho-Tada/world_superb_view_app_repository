require "rails_helper"

RSpec.describe "Api::V1::Videos", type: :request do
  describe "GET /search" do
    describe ".video_filter" do
      describe ".filter_by_genre" do
        let!(:video1) { create(:video) }
        let!(:video2) { create(:video) }
        let!(:genre_action) { create(:genre, name: "アクション") }

        before do
          create(:video_genre, video: video1, genre: genre_action)
          create(:video_genre, video: video2, genre: genre_action)
        end

        it "paramsのgenre_labelsの配列に含まれる名前を持つGenreモデルと関連付いたレコードが返されること" do
          get api_v1_videos_search_path, params: { sort_criteria: "", genre_labels: [genre_action.name] }
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response.length).to eq(2)
          expect(json_response.pluck("id")).to include video1.id, video2.id
        end

        it "返されるレコードが重複しないこと" do
          genre_horror = create(:genre, name: "ホラー")
          create(:video_genre, video: video1, genre: genre_horror)
          create(:video_genre, video: video2, genre: genre_horror)
          get api_v1_videos_search_path, params: { sort_criteria: "", genre_labels: [genre_action.name, genre_horror.name] }
          expect(response).to have_http_status(200)
          json_response = JSON.parse(response.body)
          expect(json_response).to eq json_response.uniq
        end
      end

      describe ".filter_by_keyword" do
        let!(:video1) { create(:video, title: "ダークナイト") }
        let!(:video2) { create(:video, title: "ミッドナイト・イン・パリ") }

        it "paramsのkeywordに部分一致するtitleを持つレコードが返されること" do
          get api_v1_videos_search_path, params: { sort_criteria: "", keyword: "ナイト" }
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response.length).to eq(2)
          expect(json_response.pluck("id")).to include video1.id, video2.id
        end

        it "paramsのkeywordが空文字の場合、全てのレコードが返されること" do
          video3 = create(:video)
          get api_v1_videos_search_path, params: { sort_criteria: "", genre_labels: "" }
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response.length).to eq(3)
          expect(json_response.pluck("id")).to include video1.id, video2.id, video3.id
        end
      end

      describe ".filter_by_vote_average" do
        let!(:video1) { create(:video, vote_average: 6.662) }
        let!(:video2) { create(:video, vote_average: 8.712) }

        context "vote_average_rangeが[6, 7]である場合" do
          it "vote_averageが6〜7の範囲のレコードが返されること" do
            get api_v1_videos_search_path, params: { sort_criteria: "", vote_average_range: [6, 7] }
            json_response = JSON.parse(response.body)
            expect(response).to have_http_status(200)
            expect(json_response.length).to eq(1)
            expect(json_response.pluck("id")).to include video1.id
          end
        end

        context "vote_average_rangeが[8, 9]である場合" do
          it "vote_averageが8〜9の範囲のレコードが返されること" do
            get api_v1_videos_search_path, params: { sort_criteria: "", vote_average_range: [8, 9] }
            json_response = JSON.parse(response.body)
            expect(response).to have_http_status(200)
            expect(json_response.length).to eq(1)
            expect(json_response.pluck("id")).to include video2.id
          end
        end

        context "vote_average_rangeが[6, 9]である場合" do
          it "vote_averageが6〜9の範囲のレコードが返されること" do
            get api_v1_videos_search_path, params: { sort_criteria: "", vote_average_range: [6, 9] }
            json_response = JSON.parse(response.body)
            expect(response).to have_http_status(200)
            expect(json_response.length).to eq(2)
            expect(json_response.pluck("id")).to include video1.id, video2.id
          end
        end
      end
    end

    describe ".order_by" do
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
        let!(:video1) { create(:video) }
        let!(:video2) { create(:video) }
        let!(:video3) { create(:video) }

        before do
          get api_v1_videos_search_path, params: { sort_criteria: "" }
        end

        it "レコードが処理されずに取得されること" do
          expect(response).to have_http_status(200)
          json_response = JSON.parse(response.body)
          expect(json_response.pluck("id")).to include video1.id, video2.id, video3.id
          expect(json_response.length).to eq 3
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
