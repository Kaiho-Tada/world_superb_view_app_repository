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

  describe "scope test" do
    it "filter_by_nameスコープのテスト" do
      country1 = create(:country, name: "アメリカ")
      country2 = create(:country, name: "エジプト")
      expect(Country.filter_by_name(["アメリカ"])).to include(country1)
      expect(Country.filter_by_name(["エジプト"])).to include(country2)
      expect(Country.filter_by_name(["アメリカ", "エジプト"])).to include(country1, country2)
    end

    describe ".filter_by_risk_level" do
      let!(:country1) { create(:country, risk_level: 1) }
      let!(:country2) { create(:country, risk_level: 2) }
      let!(:country3) { create(:country, risk_level: 3) }

      context "risk_levelが'1'の場合" do
        it "risk_levelが1のレコードが返されること" do
          result = Country.filter_by_risk_level("1")
          expect(result).to include country1
          expect(result.length).to be 1
        end
      end

      context "risk_levelが'2'の場合" do
        it "risk_levelが2のレコードが返されること" do
          result = Country.filter_by_risk_level("2")
          expect(result).to include country2
          expect(result.length).to be 1
        end
      end

      context "risk_levelがnilの場合" do
        it "レコードが全件返されること" do
          result = Country.filter_by_risk_level(nil)
          expect(result).to include country1, country2, country3
          expect(result.length).to be 3
        end
      end
    end

    describe ".filter_by_bmi" do
      let!(:country1) { create(:country, bmi: 5.0) }
      let!(:country2) { create(:country, bmi: -5.0) }
      let!(:country3) { create(:country) }

      it "bmi_rangeの範囲内のレコードが返されること" do
        expect(Country.filter_by_bmi(["0", "10"])).to include country1
        expect(Country.filter_by_bmi(["-10", "0"])).to include country2
        expect(Country.filter_by_bmi(["-10", "10"])).to include country1, country2
      end

      it "bmi_rangeがnilである場合、レコードが全件返されること" do
        expect(Country.filter_by_bmi(nil)).to include country1, country2, country3
      end
    end
  end
end
