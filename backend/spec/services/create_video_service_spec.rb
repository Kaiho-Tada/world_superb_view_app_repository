require "rails_helper"

RSpec.describe CreateVideoService do
  describe "#call" do
    let!(:id) { 125 }
    let!(:api_key) { "APIKEY" }
    let!(:genre1) { create(:genre, name: "genre1") }
    let!(:genre2) { create(:genre, name: "genre2") }

    context "引数のtypeがmovieの場合" do
      let!(:type) { "movie" }
      let!(:url) { "https://api.themoviedb.org/3/#{type}/#{id}?api_key=#{api_key}&language=ja" }
      let!(:response_body) do
        {
          title: "movie_title",
          poster_path: "poster_path",
          popularity: 150,
          vote_average: 10,
          release_date: "2012-04-25",
          overview: "overview",
          genres: [{ id: 1, name: "genre1" }, { id: 2, name: "genre2" }]
        }.to_json
      end
      let!(:response) { double(body: response_body, success?: true) }

      it "is_movieがtrueのVideoレコードが作成され、Genreと関連づけられること" do
        expect(ENV).to receive(:fetch).with("TMDB_API_KEY").and_return(api_key)
        expect(CreateVideoService).to receive(:get).with(url).and_return(response)
        expect { CreateVideoService.new.call({ id:, type: }) }.to change(Video, :count).by(1)
        new_video = Video.last
        expect(new_video.title).to eq "movie_title"
        expect(new_video.poster_path).to eq "poster_path"
        expect(new_video.popularity).to eq 150
        expect(new_video.vote_average).to eq 10
        expect(new_video.release_date).to eq "2012-04-25"
        expect(new_video.overview).to eq "overview"
        expect(new_video.is_movie).to eq true
        expect(new_video.genres).to eq [genre1, genre2]
      end
    end

    context "引数のtypeがtvの場合" do
      let!(:type) { "tv" }
      let!(:url) { "https://api.themoviedb.org/3/#{type}/#{id}?api_key=#{api_key}&language=ja" }
      let!(:response_body) do
        {
          name: "tv_title",
          poster_path: "poster_path",
          popularity: 100,
          vote_average: 5,
          first_air_date: "2012-04-25",
          overview: "overview",
          genres: [{ id: 1, name: "genre1" }, { id: 2, name: "genre2" }]
        }.to_json
      end
      let!(:response) { double(body: response_body, success?: true) }

      it "is_movieがfalseのVideoレコードが作成され、Genreと関連づけられること" do
        expect(ENV).to receive(:fetch).with("TMDB_API_KEY").and_return(api_key)
        response = double(body: response_body, success?: true)
        expect(CreateVideoService).to receive(:get).with(url).and_return(response)
        expect { CreateVideoService.new.call({ id:, type: }) }.to change(Video, :count).by(1)
        new_video = Video.last
        expect(new_video.title).to eq "tv_title"
        expect(new_video.poster_path).to eq "poster_path"
        expect(new_video.popularity).to eq 100
        expect(new_video.vote_average).to eq 5
        expect(new_video.release_date).to eq "2012-04-25"
        expect(new_video.overview).to eq "overview"
        expect(new_video.is_movie).to eq false
        expect(new_video.genres).to eq [genre1, genre2]
      end
    end

    context "エラーが発生した場合" do
      let!(:type) { "movie" }
      let!(:url) { "https://api.themoviedb.org/3/#{type}/#{id}?api_key=#{api_key}&language=ja" }
      let!(:response) { double(success?: false, code: "404", message: "Not Found") }

      it "データフェッチ時にエラーが発生した場合、適切に処理されること" do
        expect(ENV).to receive(:fetch).with("TMDB_API_KEY").and_return(api_key)
        expect(CreateVideoService).to receive(:get).with(url).and_return(response)
        allow(Rails.logger).to receive(:error)
        CreateVideoService.new.call({ id:, type: })
        expect(Rails.logger).to have_received(:error).with("Error: 404 - Not Found")
      end
    end
  end
end
