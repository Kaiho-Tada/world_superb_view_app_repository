require "rails_helper"

RSpec.describe FetchImgService do
  describe "#call" do
    let!(:img_id) { "abc_123" }
    let!(:api_key_value) { "ABC_123" }
    let!(:url) { "https://api.unsplash.com/photos/#{img_id}" }
    let!(:options) { { query: { client_id: api_key_value } } }

    it "FetchImgServiceが正しく機能し、UNSPLASH_API_KEYを使用して画像を取得できること" do
      expect(ENV).to receive(:fetch).with("UNSPLASH_API_KEY").and_return(api_key_value)
      response_body = { "urls" => { "regular" => "https://images.unsplash.com/photo-123456" } }.to_json
      expect(FetchImgService).to receive(:get).with(url, options).and_return(double(body: response_body, success?: true))
      result = FetchImgService.new.call(img_id)
      expect(result).to eq("https://images.unsplash.com/photo-123456")
    end

    it "画像取得時にエラーが発生した場合、適切に処理されること" do
      expect(ENV).to receive(:fetch).with("UNSPLASH_API_KEY").and_return(api_key_value)
      expect(FetchImgService).to receive(:get).with(url, options).and_return(double(success?: false, code: "404", message: "Not Found"))
      allow(Rails.logger).to receive(:error)
      FetchImgService.new.call(img_id)
      expect(Rails.logger).to have_received(:error).with("Error: 404 - Not Found")
    end
  end
end
