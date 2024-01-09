require "rails_helper"

RSpec.describe FetchTenorGifService do
  describe "#call" do
    let!(:gif_id) { "tenor_gif_id" }
    let!(:api_key_value) { "tenor_api_key_value" }
    let!(:url) { "https://tenor.googleapis.com/v2/posts" }
    let!(:options) { { query: { key: api_key_value, ids: gif_id } } }

    it "FetchTenorGifServiceが正しく機能し、TENOR_API_KEYを使用してgifのurlを取得できること" do
      expect(ENV).to receive(:fetch).with("TENOR_API_KEY").and_return(api_key_value)
      response_body = { "results" => [{ "media_formats" => { "gif" => { "url" => "https://media.tenor.com/" } } }] }.to_json
      expect(FetchTenorGifService).to receive(:get).with(url, options).and_return(double(body: response_body, success?: true))
      result = FetchTenorGifService.new.call(gif_id)
      expect(result).to eq("https://media.tenor.com/")
    end

    it "gif取得時にエラーが発生した場合、適切に処理されること" do
      expect(ENV).to receive(:fetch).with("TENOR_API_KEY").and_return(api_key_value)
      expect(FetchTenorGifService).to receive(:get).with(url, options).and_return(double(success?: false, code: "400", message: "Bad Request"))
      allow(Rails.logger).to receive(:error)
      FetchTenorGifService.new.call(gif_id)
      expect(Rails.logger).to have_received(:error).with("Error: 400 - Bad Request")
    end
  end
end
