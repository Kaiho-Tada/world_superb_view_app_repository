require "rails_helper"

RSpec.describe SuperbView, type: :model do
  describe "バリデーションのテスト" do
    it "name, panorama_url, best_season, 画像データが存在する場合、有効な状態であること" do
      expect(build(:superb_view)).to be_valid
    end

    it "nameがない場合、無効な状態であること" do
      superb_view = build(:superb_view, name: nil)
      superb_view.valid?
      expect(superb_view.errors.full_messages).to eq ["絶景名を入力してください"]
    end

    it "panorama_urlがない場合、無効な状態であること" do
      superb_view = build(:superb_view, panorama_url: nil)
      superb_view.valid?
      expect(superb_view.errors.full_messages).to eq ["パノラマURLを入力してください"]
    end

    it "best_seasonがない場合、無効な状態であること" do
      superb_view = build(:superb_view, best_season: nil)
      superb_view.valid?
      expect(superb_view.errors.full_messages).to eq ["ベストシーズンを入力してください"]
    end

    it "画像データがない場合、無効な状態であること" do
      superb_view = build(:superb_view, portrait: nil)
      superb_view.valid?
      expect(superb_view.errors.full_messages).to eq ["画像データが存在しません"]
    end

    it "nameは30文字以内であること" do
      superb_view = build(:superb_view, name: "a" * 31)
      superb_view.valid?
      expect(superb_view.errors.full_messages).to eq ["絶景名は30文字以内で入力してください"]
    end

    it "best_seasonは20文字以内であること" do
      superb_view = build(:superb_view, best_season: "a" * 31)
      superb_view.valid?
      expect(superb_view.errors.full_messages).to eq ["ベストシーズンは30文字以内で入力してください"]
    end
  end

  describe "インスタンスメソッドのテスト" do
    let!(:superb_view) { create(:superb_view) }

    it "image_urlメソッドで生成されるurlが意図した形式であること" do
      expect(superb_view.image_url).to match(%r{http://localhost:3001/rails/active_storage/blobs/redirect/.+/test_image.jpeg})
    end
  end
end
