require "rails_helper"

RSpec.describe WorldView, type: :model do
  describe "バリデーションのテスト" do
    it "name, panorama_url, best_season, 画像データが存在する場合、有効な状態であること" do
      expect(build(:world_view)).to be_valid
    end

    it "nameがない場合、無効な状態であること" do
      world_view = build(:world_view, name: nil)
      world_view.valid?
      expect(world_view.errors.full_messages).to eq ["絶景名を入力してください"]
    end

    it "best_seasonがない場合、無効な状態であること" do
      world_view = build(:world_view, best_season: nil)
      world_view.valid?
      expect(world_view.errors.full_messages).to eq ["ベストシーズンを入力してください"]
    end

    it "nameは30文字以内であること" do
      world_view = build(:world_view, name: "a" * 31)
      world_view.valid?
      expect(world_view.errors.full_messages).to eq ["絶景名は30文字以内で入力してください"]
    end

    it "best_seasonは20文字以内であること" do
      world_view = build(:world_view, best_season: "a" * 31)
      world_view.valid?
      expect(world_view.errors.full_messages).to eq ["ベストシーズンは30文字以内で入力してください"]
    end
  end

  describe "メソッドのテスト" do
    describe "extract_months_rangeメソッドのテスト" do
      it "引数の期間が数字に展開されること" do
        expect(WorldView.extract_months_range("6月〜8月")).to match_array [6, 7, 8]
      end
      it "引数の期間が年を跨ぐ場合も、数字に展開されること" do
        expect(WorldView.extract_months_range("12月〜2月")).to match_array [1, 2, 12]
      end
      it "引数の期間が複数存在する場合も、数字に展開されること" do
        expect(WorldView.extract_months_range("3月〜5月 or 9月〜11月")).to match_array [3, 4, 5, 9, 10, 11]
      end
    end
  end

  describe "スコープのテスト" do
    describe "filter_by_category_nameスコープのテスト" do
      let!(:category_city) { create(:category, name: "都市") }
      let!(:category_cave) { create(:category, name: "洞窟") }
      it "引数で受け取ったcategoy_namesに一致するカテゴリーを持つWorldViewを返すこと" do
        matera_cave_dwellings = create(:world_view, name: "マテーラの洞窟住居")
        civita_di_bagnoregio = create(:world_view, name: "チヴィタディバニョレージョ")
        machu_picchu = create(:world_view, name: "マチュピチュ")
        create(:world_view_category, world_view: matera_cave_dwellings, category: category_cave)
        create(:world_view_category, world_view: civita_di_bagnoregio, category: category_city)
        create(:world_view_category, world_view: machu_picchu, category: category_city)
        expect(WorldView.filter_by_category_name([category_cave.name])).to include(matera_cave_dwellings)
        expect(WorldView.filter_by_category_name([category_city.name])).to include(civita_di_bagnoregio, machu_picchu)
        expect(WorldView.filter_by_category_name([category_cave.name, category_city.name])).to include(matera_cave_dwellings, civita_di_bagnoregio, machu_picchu)
      end

      it "返されるWorldViewが重複しないこと" do
        duplicated_world_view = create(:world_view)
        create(:world_view_category, world_view: duplicated_world_view, category: category_cave)
        create(:world_view_category, world_view: duplicated_world_view, category: category_city)
        result_world_view = WorldView.filter_by_category_name(["洞窟", "都市"])
        expect(result_world_view).to eq result_world_view.distinct
      end
    end

    describe "filter_by_country_nameスコープのテスト" do
      it "引数で受け取ったcountry_namesに一致する国を持つWorldViewを返すこと" do
        matera_cave_dwellings = create(:world_view, name: "マテーラの洞窟住居")
        civita_di_bagnoregio = create(:world_view, name: "チヴィタディバニョレージョ")
        machu_picchu = create(:world_view, name: "マチュピチュ")
        country_italy = create(:country, name: "イタリア")
        country_peru = create(:country, name: "ペルー")
        create(:world_view_country, world_view: matera_cave_dwellings, country: country_italy)
        create(:world_view_country, world_view: civita_di_bagnoregio, country: country_italy)
        create(:world_view_country, world_view: machu_picchu, country: country_peru)
        expect(WorldView.filter_by_country_name([country_italy.name])).to include(matera_cave_dwellings, civita_di_bagnoregio)
        expect(WorldView.filter_by_country_name([country_peru.name])).to include(machu_picchu)
        expect(WorldView.filter_by_country_name([country_italy.name, country_peru.name])).to include(matera_cave_dwellings, civita_di_bagnoregio, machu_picchu)
      end

      it "返されるWorldViewが重複しないこと" do
        duplicate_world_view = create(:world_view)
        create(:world_view_country, world_view: duplicate_world_view, country: create(:country, name: "イタリア"))
        create(:world_view_country, world_view: duplicate_world_view, country: create(:country, name: "スイス"))
        result_world_view = WorldView.filter_by_country_name(["イタリア", "スイス"])
        expect(result_world_view).to eq result_world_view.distinct
      end
    end

    describe "filter_by_characteristic_nameスコープのテスト" do
      let!(:characteristic_historic) { create(:characteristic, name: "歴史・文化的") }
      let!(:characteristic_fantasy) { create(:characteristic, name: "幻想・神秘的") }
      it "引数で受け取ったcharacteristic_namesに一致する属性を持つWorldViewを返すこと" do
        matera_cave_dwellings = create(:world_view, name: "マテーラの洞窟住居")
        civita_di_bagnoregio = create(:world_view, name: "チヴィタディバニョレージョ")
        machu_picchu = create(:world_view, name: "マチュピチュ")
        create(:world_view_characteristic, world_view: matera_cave_dwellings, characteristic: characteristic_historic)
        create(:world_view_characteristic, world_view: civita_di_bagnoregio, characteristic: characteristic_fantasy)
        create(:world_view_characteristic, world_view: machu_picchu, characteristic: characteristic_historic)
        expect(WorldView.filter_by_characteristic_name([characteristic_historic.name])).to include(matera_cave_dwellings, machu_picchu)
        expect(WorldView.filter_by_characteristic_name([characteristic_fantasy.name])).to include(civita_di_bagnoregio)
        expect(WorldView.filter_by_characteristic_name([characteristic_historic.name, characteristic_fantasy.name])).to include(matera_cave_dwellings, machu_picchu, civita_di_bagnoregio)
      end

      it "返されるWorldViewが重複しないこと" do
        duplicate_world_view = create(:world_view)
        create(:world_view_characteristic, world_view: duplicate_world_view, characteristic: characteristic_historic)
        create(:world_view_characteristic, world_view: duplicate_world_view, characteristic: characteristic_fantasy)
        result_world_view = WorldView.filter_by_characteristic_name(["歴史・文化的", "幻想・神秘的"])
        expect(result_world_view).to eq result_world_view.distinct
      end
    end

    describe "filter_by_country_risk_levelスコープのテスト" do
      it "引数で受け取ったrisk_levelに一致する国を持つWorldViewを返すこと" do
        matera_cave_dwellings = create(:world_view, name: "マテーラの洞窟住居")
        civita_di_bagnoregio = create(:world_view, name: "チヴィタディバニョレージョ")
        machu_picchu = create(:world_view, name: "マチュピチュ")
        country_italy = create(:country, name: "イタリア", risk_level: 0)
        country_peru = create(:country, name: "ペルー", risk_level: 3)
        create(:world_view_country, world_view: matera_cave_dwellings, country: country_italy)
        create(:world_view_country, world_view: civita_di_bagnoregio, country: country_italy)
        create(:world_view_country, world_view: machu_picchu, country: country_peru)
        expect(WorldView.filter_by_country_risk_level(["0"])).to include(matera_cave_dwellings, civita_di_bagnoregio)
        expect(WorldView.filter_by_country_risk_level(["3"])).to include(machu_picchu)
        expect(WorldView.filter_by_country_risk_level(["0", "3"])).to include(matera_cave_dwellings, civita_di_bagnoregio, machu_picchu)
      end

      it "返されるWorldViewが重複しないこと" do
        duplicate_world_view = create(:world_view)
        create(:world_view_country, world_view: duplicate_world_view, country: create(:country, risk_level: 1))
        create(:world_view_country, world_view: duplicate_world_view, country: create(:country, risk_level: 2))
        result_world_view = WorldView.filter_by_country_risk_level(["1", "2"])
        expect(result_world_view).to eq result_world_view.distinct
      end
    end

    describe "filter_by_keywordスコープのテスト" do
      it "引数で受け取ったkeywordに部分一致する名前と国名を持つWorldViewを返すこと" do
        matera_cave_dwellings = create(:world_view, name: "マテーラの洞窟住居")
        civita_di_bagnoregio = create(:world_view, name: "チヴィタディバニョレージョ")
        machu_picchu = create(:world_view, name: "マチュピチュ")
        country_italy = create(:country, name: "イタリア")
        country_peru = create(:country, name: "ペルー")
        create(:world_view_country, world_view: matera_cave_dwellings, country: country_italy)
        create(:world_view_country, world_view: civita_di_bagnoregio, country: country_italy)
        create(:world_view_country, world_view: machu_picchu, country: country_peru)
        expect(WorldView.filter_by_keyword("マ")).to eq [matera_cave_dwellings, machu_picchu]
        expect(WorldView.filter_by_keyword("イタリア")).to eq [matera_cave_dwellings, civita_di_bagnoregio]
      end

      it "返されるWorldViewが重複しないこと" do
        duplicate_world_view = create(:world_view, name: "重複する絶景")
        create(:world_view_country, world_view: duplicate_world_view, country: create(:country))
        create(:world_view_country, world_view: duplicate_world_view, country: create(:country))
        result_world_view = WorldView.filter_by_keyword("重複する絶景")
        expect(result_world_view).to eq result_world_view.distinct
      end
    end

    describe "filter_by_monthのスコープのテスト" do
      it "引数で受け取ったmonthsの月をbest_seasonに持つWorldViewを返すこと" do
        world_view1 = create(:world_view, best_season: "12月〜2月")
        world_view2 = create(:world_view, best_season: "3月〜5月 or 9月〜11月")
        world_view3 = create(:world_view, best_season: "6月〜8月")
        expect(WorldView.filter_by_month(["1月"])).to eq [world_view1]
        expect(WorldView.filter_by_month(["4月"])).to eq [world_view2]
        expect(WorldView.filter_by_month(["7月"])).to eq [world_view3]
        expect(WorldView.filter_by_month(["10月", "11月"])).to eq [world_view2]
      end
    end

    describe "filter_by_country_bmi" do
      it "引数で受け取ったbmi_rangesの範囲に含まれる値のbmiカラムを持つCountryモデルと関連付けしているWorldViewを返すこと" do
        world_view1 = create(:world_view)
        world_view2 = create(:world_view)
        world_view3 = create(:world_view)
        create(:world_view_country, world_view: world_view1, country: create(:country, bmi: 2.2))
        create(:world_view_country, world_view: world_view2, country: create(:country, bmi: 35.9))
        create(:world_view_country, world_view: world_view3, country: create(:country, bmi: -5.1))
        create(:world_view_country, world_view: world_view3, country: create(:country, bmi: -40.2))
        expect(WorldView.filter_by_country_bmi(["0%〜10%"])).to include world_view1
        expect(WorldView.filter_by_country_bmi(["30%〜"])).to include world_view2
        expect(WorldView.filter_by_country_bmi(["-10%〜0%"])).to include world_view3
        expect(WorldView.filter_by_country_bmi(["〜-40%"])).to include world_view3
      end

      it "返されるWorldViewが重複しないこと" do
        duplicate_world_view = create(:world_view)
        create(:world_view_country, world_view: duplicate_world_view, country: create(:country, bmi: 35.9))
        create(:world_view_country, world_view: duplicate_world_view, country: create(:country, bmi: -40.2))
        result_world_view = WorldView.filter_by_country_bmi(["30%〜", "〜-40%"])
        expect(result_world_view).to eq result_world_view.distinct
      end
    end

    describe "sort_by_latestスコープのテスト" do
      it "レコードが新しい順に取得できること" do
        world_view1 = create(:world_view, created_at: 3.days.ago)
        world_view2 = create(:world_view, created_at: 2.days.ago)
        world_view3 = create(:world_view, created_at: 1.day.ago)
        expect(WorldView.sort_by_latest).to eq [world_view3, world_view2, world_view1]
      end
    end

    describe "sort_by_country_bmiスコープのテスト" do
      it "関連のCountryのBMIの値が低い順にレコードが取得できること" do
        world_view1 = create(:world_view)
        world_view2 = create(:world_view)
        world_view3 = create(:world_view)
        create(:world_view_country, world_view: world_view1, country: create(:country, bmi: 13.6))
        create(:world_view_country, world_view: world_view2, country: create(:country, bmi: -0.5))
        create(:world_view_country, world_view: world_view3, country: create(:country, bmi: -22.2))
        expect(WorldView.sort_by_country_bmi).to eq [world_view3, world_view2, world_view1]
      end

      it "返されるレコードが重複している場合はBMI値の低いレコードが取得されること" do
        duplicate_world_view = create(:world_view)
        non_duplicate_world_view = create(:world_view)
        create(:world_view_country, world_view: duplicate_world_view, country: create(:country, bmi: 10.0))
        create(:world_view_country, world_view: non_duplicate_world_view, country: create(:country, bmi: 0.0))
        create(:world_view_country, world_view: duplicate_world_view, country: create(:country, bmi: -10.0))
        expect(WorldView.sort_by_country_bmi).to eq [duplicate_world_view, non_duplicate_world_view]
      end
    end

    describe "sort_by_country_risk_levelスコープのテスト" do
      it "関連のCountryのrisk_levelの値が低い順にレコードが取得できること" do
        world_view1 = create(:world_view)
        world_view2 = create(:world_view)
        world_view3 = create(:world_view)
        world_view4 = create(:world_view)
        create(:world_view_country, world_view: world_view1, country: create(:country, risk_level: 4))
        create(:world_view_country, world_view: world_view2, country: create(:country, risk_level: 3))
        create(:world_view_country, world_view: world_view3, country: create(:country, risk_level: 2))
        create(:world_view_country, world_view: world_view4, country: create(:country, risk_level: 1))
        expect(WorldView.sort_by_country_risk_level).to eq [world_view4, world_view3, world_view2, world_view1]
      end

      it "返されるレコードが重複している場合はリスクレベルの低いレコードが取得されること" do
        duplicate_world_view = create(:world_view)
        non_duplicate_world_view = create(:world_view)
        create(:world_view_country, world_view: duplicate_world_view, country: create(:country, risk_level: 3))
        create(:world_view_country, world_view: non_duplicate_world_view, country: create(:country, risk_level: 2))
        create(:world_view_country, world_view: duplicate_world_view, country: create(:country, risk_level: 1))
        expect(WorldView.sort_by_country_risk_level).to eq [duplicate_world_view, non_duplicate_world_view]
      end
    end

    describe "sort_by_favorite_countスコープのテスト" do
      it "favoriteの数が多い順にレコードが取得できること" do
        world_view1 = create(:world_view)
        world_view2 = create(:world_view)
        world_view3 = create(:world_view)
        create(:world_view_favorite, world_view: world_view1, user: create(:user))
        create(:world_view_favorite, world_view: world_view2, user: create(:user))
        create(:world_view_favorite, world_view: world_view2, user: create(:user))
        create(:world_view_favorite, world_view: world_view3, user: create(:user))
        create(:world_view_favorite, world_view: world_view3, user: create(:user))
        create(:world_view_favorite, world_view: world_view3, user: create(:user))
        expect(WorldView.sort_by_favorite_count).to eq [world_view3, world_view2, world_view1]
      end
    end
  end
end
