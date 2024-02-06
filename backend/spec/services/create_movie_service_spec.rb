require "rails_helper"

RSpec.describe CreateMovieService do
  describe "#call" do
    let!(:movie_id) { "125" }
    let!(:api_key_value) { "aBc123" }
    let!(:url) { "https://api.themoviedb.org/3/movie/#{movie_id}?api_key=#{api_key_value}&language=ja" }

    it "CreateMovieServiceがTMDB_API_KEYを使用して映画のデータをフェッチし、そのデータを使用してMovieモデルのレコードが作成されること" do
      expect(ENV).to receive(:fetch).with("TMDB_API_KEY").and_return(api_key_value)
      response_body = { title: "アベンジャーズ", poster_path: "poster_path", budget: 220_000_000,
                        revenue: 1_518_815_515, popularity: 129.103, vote_average: 7.712, release_date: "2012-04-25",
                        status: true, overview: "overview" }.to_json
      response = double(body: response_body, success?: true)
      expect(CreateMovieService).to receive(:get).with(url).and_return(response)
      expect { CreateMovieService.new.call(movie_id) }.to change(Movie, :count).by(1)
      new_movie = Movie.last
      expect(new_movie.title).to eq "アベンジャーズ"
      expect(new_movie.poster_path).to eq "poster_path"
      expect(new_movie.budget).to eq 220_000_000
      expect(new_movie.revenue).to eq 1_518_815_515
      expect(new_movie.popularity).to eq 129.103
      expect(new_movie.vote_average).to eq 7.712
      expect(new_movie.release_date).to eq "2012-04-25"
      expect(new_movie.status).to eq true
      expect(new_movie.overview).to eq "overview"
    end

    it "データフェッチ時にエラーが発生した場合、適切に処理されること" do
      expect(ENV).to receive(:fetch).with("TMDB_API_KEY").and_return(api_key_value)
      response = double(success?: false, code: "404", message: "Not Found")
      expect(CreateMovieService).to receive(:get).with(url).and_return(response)
      allow(Rails.logger).to receive(:error)
      CreateMovieService.new.call(movie_id)
      expect(Rails.logger).to have_received(:error).with("Error: 404 - Not Found")
    end
  end
end
