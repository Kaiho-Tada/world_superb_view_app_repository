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

  describe "スコープのテスト" do
    let!(:matera_cave_dwellings) { create(:superb_view, name: "マテーラの洞窟住居") }
    let!(:civita_di_bagnoregio) { create(:superb_view, name: "チヴィタディバニョレージョ") }
    let!(:machu_picchu) { create(:superb_view, name: "マチュピチュ") }

    describe "filter_by_category_nameスコープのテスト" do
      it "引数で受け取ったcategoy_namesに一致するカテゴリーを持つSuperbViewを返すこと" do
        category_cave = create(:category, name: "洞窟")
        category_city = create(:category, name: "都市")
        create(:superb_view_category, superb_view: matera_cave_dwellings, category: category_cave)
        create(:superb_view_category, superb_view: civita_di_bagnoregio, category: category_city)
        create(:superb_view_category, superb_view: machu_picchu, category: category_city)
        expect(SuperbView.filter_by_category_name([category_cave.name])).to include(matera_cave_dwellings)
        expect(SuperbView.filter_by_category_name([category_city.name])).to include(civita_di_bagnoregio, machu_picchu)
        expect(SuperbView.filter_by_category_name([category_cave.name, category_city.name])).to include(matera_cave_dwellings, civita_di_bagnoregio, machu_picchu)
      end

      it "返されるSuperbViewが重複しないこと" do
        duplicated_superb_view = create(:superb_view)
        category1 = create(:category)
        category2 = create(:category)
        create(:superb_view_category, superb_view: duplicated_superb_view, category: category1)
        create(:superb_view_category, superb_view: duplicated_superb_view, category: category2)
        expect(SuperbView.filter_by_category_name([category1.name, category2.name])).to eq [duplicated_superb_view]
      end
    end

    describe "filter_by_country_nameスコープのテスト" do
      it "引数で受け取ったcountry_namesに一致する国を持つSuperbViewを返すこと" do
        country_italy = create(:country, name: "イタリア")
        country_peru = create(:country, name: "ペルー")
        create(:superb_view_country, superb_view: matera_cave_dwellings, country: country_italy)
        create(:superb_view_country, superb_view: civita_di_bagnoregio, country: country_italy)
        create(:superb_view_country, superb_view: machu_picchu, country: country_peru)
        expect(SuperbView.filter_by_country_name([country_italy.name])).to include(matera_cave_dwellings, civita_di_bagnoregio)
        expect(SuperbView.filter_by_country_name([country_peru.name])).to include(machu_picchu)
        expect(SuperbView.filter_by_country_name([country_italy.name, country_peru.name])).to include(matera_cave_dwellings, civita_di_bagnoregio, machu_picchu)
      end

      it "返されるSuperbViewが重複しないこと" do
        duplicated_superb_view = create(:superb_view)
        country1 = create(:country)
        country2 = create(:country)
        create(:superb_view_country, superb_view: duplicated_superb_view, country: country1)
        create(:superb_view_country, superb_view: duplicated_superb_view, country: country2)
        expect(SuperbView.filter_by_country_name([country1.name, country2.name])).to eq [duplicated_superb_view]
      end
    end

    describe "filter_by_characteristic_nameスコープのテスト" do
      it "引数で受け取ったcharacteristic_namesに一致する属性を持つSuperbViewを返すこと" do
        characteristic_historic = create(:characteristic, name: "歴史・文化的")
        characteristic_fantasy = create(:characteristic, name: "幻想・神秘的")
        create(:superb_view_characteristic, superb_view: matera_cave_dwellings, characteristic: characteristic_historic)
        create(:superb_view_characteristic, superb_view: civita_di_bagnoregio, characteristic: characteristic_fantasy)
        create(:superb_view_characteristic, superb_view: machu_picchu, characteristic: characteristic_historic)
        expect(SuperbView.filter_by_characteristic_name([characteristic_historic.name])).to include(matera_cave_dwellings, machu_picchu)
        expect(SuperbView.filter_by_characteristic_name([characteristic_fantasy.name])).to include(civita_di_bagnoregio)
        expect(SuperbView.filter_by_characteristic_name([characteristic_historic.name, characteristic_fantasy.name])).to include(matera_cave_dwellings, machu_picchu, civita_di_bagnoregio)
      end

      it "返されるSuperbViewが重複しないこと" do
        duplicated_superb_view = create(:superb_view)
        characteristic1 = create(:characteristic)
        characteristic2 = create(:characteristic)
        create(:superb_view_characteristic, superb_view: duplicated_superb_view, characteristic: characteristic1)
        create(:superb_view_characteristic, superb_view: duplicated_superb_view, characteristic: characteristic2)
        expect(SuperbView.filter_by_characteristic_name([characteristic1.name, characteristic2.name])).to eq [duplicated_superb_view]
      end
    end

    describe "filter_by_country_risk_levelスコープのテスト" do
      it "引数で受け取ったrisk_levelに一致する国を持つSuperbViewを返すこと" do
        country_italy = create(:country, name: "イタリア", risk_level: 0)
        country_peru = create(:country, name: "ペルー", risk_level: 3)
        create(:superb_view_country, superb_view: matera_cave_dwellings, country: country_italy)
        create(:superb_view_country, superb_view: civita_di_bagnoregio, country: country_italy)
        create(:superb_view_country, superb_view: machu_picchu, country: country_peru)
        expect(SuperbView.filter_by_country_risk_level(["0"])).to include(matera_cave_dwellings, civita_di_bagnoregio)
        expect(SuperbView.filter_by_country_risk_level(["3"])).to include(machu_picchu)
        expect(SuperbView.filter_by_country_risk_level(["0", "3"])).to include(matera_cave_dwellings, civita_di_bagnoregio, machu_picchu)
      end

      it "返されるSuperbViewが重複しないこと" do
        duplicated_superb_view = create(:superb_view)
        country1 = create(:country, risk_level: 1)
        country2 = create(:country, risk_level: 2)
        create(:superb_view_country, superb_view: duplicated_superb_view, country: country1)
        create(:superb_view_country, superb_view: duplicated_superb_view, country: country2)
        expect(SuperbView.filter_by_country_risk_level(["1", "2"])).to eq [duplicated_superb_view]
      end
    end

    describe "filter_by_keywordスコープのテスト" do
      it "引数で受け取ったkeywordに部分一致する名前と国名を持つSuperbViewを返すこと" do
        country_italy = create(:country, name: "イタリア")
        country_peru = create(:country, name: "ペルー")
        create(:superb_view_country, superb_view: matera_cave_dwellings, country: country_italy)
        create(:superb_view_country, superb_view: civita_di_bagnoregio, country: country_italy)
        create(:superb_view_country, superb_view: machu_picchu, country: country_peru)
        expect(SuperbView.filter_by_keyword("マ")).to eq [matera_cave_dwellings, machu_picchu]
        expect(SuperbView.filter_by_keyword("イタリア")).to eq [matera_cave_dwellings, civita_di_bagnoregio]
      end

      it "返されるSuperbViewが重複しないこと" do
        duplicate_superb_view = create(:superb_view, name: "重複する絶景")
        create(:superb_view_country, superb_view: duplicate_superb_view, country: create(:country))
        create(:superb_view_country, superb_view: duplicate_superb_view, country: create(:country))
        result_superb_view = SuperbView.filter_by_keyword("重複する絶景")
        expect(result_superb_view).to eq result_superb_view.distinct
      end
    end
  end
end
