require "rails_helper"

RSpec.describe Country, type: :model do
  describe "バリデーションのテスト" do
    it "name, code, 画像データが存在している場合、有効な状態であること" do
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

    context "regionカラム" do
      it "regionがない場合、無効な状態であること" do
        country = build(:country, region: nil)
        country.valid?
        expect(country.errors.full_messages).to eq ["地域を入力してください"]
      end
    end

    context "portraitカラム" do
      it "画像データがない場合、無効な状態であること" do
        country = build(:country, portrait: nil)
        country.valid?
        expect(country.errors.full_messages).to eq ["画像データが存在しません"]
      end
    end
  end

  describe "エイリアスのテスト" do
    it "parentはregionのエイリアスであること" do
      country = Country.new(region: "Africa")
      expect(country.parent).to eq("Africa")
    end
  end

  describe "インスタンスメソッドのテスト" do
    let!(:country) { create(:country) }

    it "image_urlメソッドで生成されるurlが意図した形式であること" do
      expect(country.image_url).to match(%r{http://localhost:3001/rails/active_storage/blobs/redirect/.+/test_image.jpeg})
    end
  end

  describe "メソッドのテスト" do
    describe "parse_rangeメソッドのテスト" do
      it "範囲文字列がRangeオブジェクトに変換されること" do
        range_string1 = "10%〜20%"
        range_string2 = "30%〜"
        expect(Country.parse_range(range_string1)).to eq 10..20
        expect(Country.parse_range(range_string2)).to eq 30..100
      end
      it "負の範囲文字列がRangeオブジェクトに変換されること" do
        range_string1 = "-10%〜-20%"
        range_string2 = "〜-40%"
        expect(Country.parse_range(range_string1)).to eq(-10..-20)
        expect(Country.parse_range(range_string2)).to eq(-100..-40)
      end
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

    it "filter_by_bmiスコープでbmiカラムが引数の範囲に含まれているCountryモデルを取得できること" do
      country1 = create(:country, bmi: 16.3)
      country2 = create(:country, bmi: -28.9)
      country3 = create(:country, bmi: 36.6)
      country4 = create(:country, bmi: -46.2)
      expect(Country.filter_by_bmi(["10%〜20%"])).to include country1
      expect(Country.filter_by_bmi(["-30%〜-20%"])).to include country2
      expect(Country.filter_by_bmi(["30%〜"])).to include country3
      expect(Country.filter_by_bmi(["〜-40%"])).to include country4
    end
  end
end
