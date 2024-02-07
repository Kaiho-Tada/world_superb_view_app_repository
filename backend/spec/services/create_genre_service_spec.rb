require "rails_helper"

RSpec.describe CreateGenreService do
  describe "#call" do
    let!(:api_key) { "aBc123" }
    let!(:type) { "movie" }
    let!(:url) { "https://api.themoviedb.org/3/genre/#{type}/list?api_key=#{api_key}&language=ja" }

    it "TMDB_API_KEYキーを使用してジャンルのデータをフェッチし、そのデータを使用してGenreモデルのレコードが作成されること" do
      expect(ENV).to receive(:fetch).with("TMDB_API_KEY").and_return(api_key)
      response_body = { genres: [{ id: 1, name: "genre1" }, { id: 2, name: "genre2" }] }.to_json
      expect(CreateGenreService).to receive(:get).with(url).and_return(double(body: response_body, success?: true))
      expect { CreateGenreService.new.call(type) }.to change(Genre, :count).by(2)
      expect(Genre.pluck(:name)).to match_array(["genre1", "genre2"])
    end

    it "データフェッチ時にエラーが発生した場合、適切に処理されること" do
      expect(ENV).to receive(:fetch).with("TMDB_API_KEY").and_return(api_key)
      expect(CreateGenreService).to receive(:get).with(url).and_return(double(success?: false, code: "404", message: "Not Found"))
      allow(Rails.logger).to receive(:error)
      CreateGenreService.new.call(type)
      expect(Rails.logger).to have_received(:error).with("Error: 404 - Not Found")
    end
  end
end
