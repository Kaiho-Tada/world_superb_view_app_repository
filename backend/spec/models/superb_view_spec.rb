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

  describe "メソッドのテスト" do
    describe "image_urlメソッドのテスト" do
      it "image_urlメソッドで生成されるurlが意図した形式であること" do
        superb_view = create(:superb_view)
        expect(superb_view.image_url).to match(%r{http://localhost:3001/rails/active_storage/blobs/redirect/.+/test_image.jpeg})
      end
    end

    describe "extract_months_rangeメソッドのテスト" do
      it "引数の期間が数字に展開されること" do
        expect(SuperbView.extract_months_range("6月〜8月")).to match_array [6, 7, 8]
      end
      it "引数の期間が年を跨ぐ場合も、数字に展開されること" do
        expect(SuperbView.extract_months_range("12月〜2月")).to match_array [1, 2, 12]
      end
      it "引数の期間が複数存在する場合も、数字に展開されること" do
        expect(SuperbView.extract_months_range("3月〜5月 or 9月〜11月")).to match_array [3, 4, 5, 9, 10, 11]
      end
    end
  end

  describe "スコープのテスト" do
    let!(:matera_cave_dwellings) { create(:superb_view, name: "マテーラの洞窟住居") }
    let!(:civita_di_bagnoregio) { create(:superb_view, name: "チヴィタディバニョレージョ") }
    let!(:machu_picchu) { create(:superb_view, name: "マチュピチュ") }

    describe "filter_by_category_nameスコープのテスト" do
      let!(:category_city) { create(:category, name: "都市") }
      let!(:category_cave) { create(:category, name: "洞窟") }
      it "引数で受け取ったcategoy_namesに一致するカテゴリーを持つSuperbViewを返すこと" do
        create(:superb_view_category, superb_view: matera_cave_dwellings, category: category_cave)
        create(:superb_view_category, superb_view: civita_di_bagnoregio, category: category_city)
        create(:superb_view_category, superb_view: machu_picchu, category: category_city)
        expect(SuperbView.filter_by_category_name([category_cave.name])).to include(matera_cave_dwellings)
        expect(SuperbView.filter_by_category_name([category_city.name])).to include(civita_di_bagnoregio, machu_picchu)
        expect(SuperbView.filter_by_category_name([category_cave.name, category_city.name])).to include(matera_cave_dwellings, civita_di_bagnoregio, machu_picchu)
      end

      it "返されるSuperbViewが重複しないこと" do
        duplicated_superb_view = create(:superb_view)
        create(:superb_view_category, superb_view: duplicated_superb_view, category: category_cave)
        create(:superb_view_category, superb_view: duplicated_superb_view, category: category_city)
        result_superb_view = SuperbView.filter_by_category_name(["洞窟", "都市"])
        expect(result_superb_view).to eq result_superb_view.distinct
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
        duplicate_superb_view = create(:superb_view)
        create(:superb_view_country, superb_view: duplicate_superb_view, country: create(:country, name: "イタリア"))
        create(:superb_view_country, superb_view: duplicate_superb_view, country: create(:country, name: "スイス"))
        result_superb_view = SuperbView.filter_by_country_name(["イタリア", "スイス"])
        expect(result_superb_view).to eq result_superb_view.distinct
      end
    end

    describe "filter_by_characteristic_nameスコープのテスト" do
      let!(:characteristic_historic) { create(:characteristic, name: "歴史・文化的") }
      let!(:characteristic_fantasy) { create(:characteristic, name: "幻想・神秘的") }
      it "引数で受け取ったcharacteristic_namesに一致する属性を持つSuperbViewを返すこと" do
        create(:superb_view_characteristic, superb_view: matera_cave_dwellings, characteristic: characteristic_historic)
        create(:superb_view_characteristic, superb_view: civita_di_bagnoregio, characteristic: characteristic_fantasy)
        create(:superb_view_characteristic, superb_view: machu_picchu, characteristic: characteristic_historic)
        expect(SuperbView.filter_by_characteristic_name([characteristic_historic.name])).to include(matera_cave_dwellings, machu_picchu)
        expect(SuperbView.filter_by_characteristic_name([characteristic_fantasy.name])).to include(civita_di_bagnoregio)
        expect(SuperbView.filter_by_characteristic_name([characteristic_historic.name, characteristic_fantasy.name])).to include(matera_cave_dwellings, machu_picchu, civita_di_bagnoregio)
      end

      it "返されるSuperbViewが重複しないこと" do
        duplicate_superb_view = create(:superb_view)
        create(:superb_view_characteristic, superb_view: duplicate_superb_view, characteristic: characteristic_historic)
        create(:superb_view_characteristic, superb_view: duplicate_superb_view, characteristic: characteristic_fantasy)
        result_superb_view = SuperbView.filter_by_characteristic_name(["歴史・文化的", "幻想・神秘的"])
        expect(result_superb_view).to eq result_superb_view.distinct
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
        duplicate_superb_view = create(:superb_view)
        create(:superb_view_country, superb_view: duplicate_superb_view, country: create(:country, risk_level: 1))
        create(:superb_view_country, superb_view: duplicate_superb_view, country: create(:country, risk_level: 2))
        result_superb_view = SuperbView.filter_by_country_risk_level(["1", "2"])
        expect(result_superb_view).to eq result_superb_view.distinct
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

    describe "filter_by_monthのスコープのテスト" do
      it "引数で受け取ったmonthsの月をbest_seasonに持つSuperbViewを返すこと" do
        superb_view1 = create(:superb_view, best_season: "12月〜2月")
        superb_view2 = create(:superb_view, best_season: "3月〜5月 or 9月〜11月")
        superb_view3 = create(:superb_view, best_season: "6月〜8月")
        expect(SuperbView.filter_by_month(["1月"])).to eq [superb_view1]
        expect(SuperbView.filter_by_month(["4月"])).to eq [superb_view2]
        expect(SuperbView.filter_by_month(["7月"])).to eq [superb_view3]
        expect(SuperbView.filter_by_month(["10月", "11月"])).to eq [superb_view2]
      end
    end
  end
end
