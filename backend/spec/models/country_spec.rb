require "rails_helper"

RSpec.describe Country, type: :model do
  describe "バリデーションのテスト" do
    it "name, code, 画像データが存在し、stateモデルが関連付けされている場合、有効な状態であること" do
      expect(build(:country)).to be_valid
    end

    context "nameカラム" do
      it "nameがない場合、無効な状態であること" do
        country = build(:country, name: nil)
        country.valid?
        expect(country.errors.full_messages).to eq ["国名を入力してください"]
      end

      it "nameは30文字以内であること" do
        country = build(:country, name: "a" * 31)
        country.valid?
        expect(country.errors.full_messages).to eq ["国名は30文字以内で入力してください"]
      end
    end

    context "codeカラム" do
      it "codeがない場合、無効な状態であること" do
        country = build(:country, code: nil)
        country.valid?
        expect(country.errors.full_messages).to eq ["コードを入力してください"]
      end

      it "codeは30文字以内であること" do
        country = build(:country, code: "a" * 31)
        country.valid?
        expect(country.errors.full_messages).to eq ["コードは30文字以内で入力してください"]
      end
    end

    context "risk_levelカラム" do
      it "risk_levelは1字以内であること" do
        country = build(:country, risk_level: 10)
        country.valid?
        expect(country.errors.full_messages).to eq ["リスクレベルは1文字以内で入力してください"]
      end
    end

    context "portraitカラム" do
      it "画像データがない場合、無効な状態であること" do
        country = build(:country, portrait: nil)
        country.valid?
        expect(country.errors.full_messages).to eq ["画像データが存在しません"]
      end
    end

    context "stateモデル" do
      it "stateモデルが関連付けされていない場合、無効な状態であること" do
        country = build(:country, state: nil)
        country.valid?
        expect(country.errors.full_messages).to eq ["州を入力してください"]
      end
    end
  end

  describe "インスタンスメソッドのテスト" do
    let!(:country) { create(:country) }

    it "image_urlメソッドで生成されるurlが意図した形式であること" do
      expect(country.image_url).to match(%r{http://localhost:3001/rails/active_storage/blobs/redirect/.+/test_image.jpeg})
    end
  end

  describe "スコープテスト" do
    it "filter_by_nameスコープのテスト" do
      country1 = create(:country, name: "アメリカ")
      country2 = create(:country, name: "エジプト")
      expect(Country.filter_by_name(["アメリカ"])).to include(country1)
      expect(Country.filter_by_name(["エジプト"])).to include(country2)
      expect(Country.filter_by_name(["アメリカ", "エジプト"])).to include(country1, country2)
    end

    it "filter_by_risk_levelスコープのテスト" do
      country1 = create(:country, name: "ロシア", risk_level: 4)
      country2 = create(:country, name: "エジプト", risk_level: 3)
      expect(Country.filter_by_risk_level(["4"])).to include(country1)
      expect(Country.filter_by_risk_level(["3"])).to include(country2)
      expect(Country.filter_by_risk_level(["4", "3"])).to include(country1, country2)
    end
  end
end
