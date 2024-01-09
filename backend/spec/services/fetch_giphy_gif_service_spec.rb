require "rails_helper"

RSpec.describe FetchGiphyGifService do
  describe "#call" do
    let!(:gif_id) { "gif_id" }
    let!(:api_key_value) { "api_key_value" }
    let!(:url) { "https://api.giphy.com/v1/gifs/#{gif_id}" }
    let!(:options) { { query: { api_key: api_key_value } } }

    it "FetchGiphyGifServiceが正しく機能し、GIPHY_API_KEYを使用してgifのurlを取得できること" do
      expect(ENV).to receive(:fetch).with("GIPHY_API_KEY").and_return(api_key_value)
      response_body = { "data" => { "images" => { "fixed_height" => { "url" => "https://media1.giphy.com/media/#{gif_id}" } } } }.to_json
      expect(FetchGiphyGifService).to receive(:get).with(url, options).and_return(double(body: response_body, success?: true))
      result = FetchGiphyGifService.new.call(gif_id)
      expect(result).to eq("https://media1.giphy.com/media/#{gif_id}")
    end

    it "gif取得時にエラーが発生した場合、適切に処理されること" do
      expect(ENV).to receive(:fetch).with("GIPHY_API_KEY").and_return(api_key_value)
      expect(FetchGiphyGifService).to receive(:get).with(url, options).and_return(double(success?: false, code: "404", message: "Not Found"))
      allow(Rails.logger).to receive(:error)
      FetchGiphyGifService.new.call(gif_id)
      expect(Rails.logger).to have_received(:error).with("Error: 404 - Not Found")
    end
  end
end
