require "rails_helper"

RSpec.describe "Api::V1::WorldViews", type: :request do
  describe "GET api/v1/world_views/search" do
    describe "world_view_filterメソッド内のスコープのテスト" do
      describe "filter_by_category_nameスコープのテスト" do
        it "paramsのcategory_namesの配列に含まれる名前のCategoryモデルと関連付けられたレコードを返すこと" do
          world_view1 = create(:world_view)
          world_view2 = create(:world_view)
          category_cave = create(:category, name: "洞窟")
          create(:world_view_category, world_view: world_view1, category: category_cave)
          create(:world_view_category, world_view: world_view2, category: category_cave)
          get api_v1_world_views_search_path, params: {
            category_names: ["洞窟"]
          }
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response.length).to eq(2)
          expect(json_response.map { |view| view["id"] }).to include(world_view1.id, world_view2.id)
        end

        it "返されるレコードが重複しないこと" do
          duplicated_world_view = create(:world_view)
          category1 = create(:category)
          category2 = create(:category)
          create(:world_view_category, world_view: duplicated_world_view, category: category1)
          create(:world_view_category, world_view: duplicated_world_view, category: category2)
          get api_v1_world_views_search_path, params: {
            category_names: [category1.name, category2.name]
          }
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response).to eq json_response.uniq
        end
      end

      describe "filter_by_country_nameスコープのテスト" do
        it "paramsのcountry_namesの配列に含まれる名前のCountryモデルと関連付けられたレコードを返すこと" do
          world_view1 = create(:world_view)
          world_view2 = create(:world_view)
          country_italy = create(:country, name: "イタリア")
          create(:world_view_country, world_view: world_view1, country: country_italy)
          create(:world_view_country, world_view: world_view2, country: country_italy)
          get api_v1_world_views_search_path, params: {
            country_names: ["イタリア"]
          }
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response.length).to eq(2)
          expect(json_response.map { |view| view["id"] }).to include(world_view1.id, world_view2.id)
        end

        it "返されるレコードが重複しないこと" do
          duplicated_world_view = create(:world_view)
          country1 = create(:country)
          country2 = create(:country)
          create(:world_view_country, world_view: duplicated_world_view, country: country1)
          create(:world_view_country, world_view: duplicated_world_view, country: country2)
          get api_v1_world_views_search_path, params: {
            country_names: [country1.name, country2.name]
          }
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response).to eq json_response.uniq
        end
      end

      describe "filter_by_characteristic_nameスコープのテスト" do
        it "paramsのcharacteristic_namesの配列に含まれる名前のCharacteristicモデルと関連付けられたレコードを返すこと" do
          world_view1 = create(:world_view)
          world_view2 = create(:world_view)
          characteristic_fantasy = create(:characteristic, name: "幻想・神秘的")
          create(:world_view_characteristic, world_view: world_view1, characteristic: characteristic_fantasy)
          create(:world_view_characteristic, world_view: world_view2, characteristic: characteristic_fantasy)
          get api_v1_world_views_search_path, params: {
            characteristic_names: ["幻想・神秘的"]
          }
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response.length).to eq(2)
          expect(json_response.map { |view| view["id"] }).to include(world_view1.id, world_view2.id)
        end

        it "返されるレコードが重複しないこと" do
          duplicated_world_view = create(:world_view)
          characteristic1 = create(:characteristic)
          characteristic2 = create(:characteristic)
          create(:world_view_characteristic, world_view: duplicated_world_view, characteristic: characteristic1)
          create(:world_view_characteristic, world_view: duplicated_world_view, characteristic: characteristic2)
          get api_v1_world_views_search_path, params: {
            characteristic_names: [characteristic1.name, characteristic2.name]
          }
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response).to eq json_response.uniq
        end
      end

      describe "filter_by_country_risk_levelスコープのテスト" do
        it "paramsのrisk_levelsの配列に含まれるrisk_levelのCountryモデルと関連付けられたレコードを返すこと" do
          world_view1 = create(:world_view)
          world_view2 = create(:world_view)
          country1 = create(:country, risk_level: 1)
          create(:world_view_country, world_view: world_view1, country: country1)
          create(:world_view_country, world_view: world_view2, country: country1)
          get api_v1_world_views_search_path, params: {
            risk_levels: ["1"]
          }
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response.length).to eq(2)
          expect(json_response.map { |view| view["id"] }).to include(world_view1.id, world_view2.id)
        end

        it "返されるレコードが重複しないこと" do
          duplicated_world_view = create(:world_view)
          country1 = create(:country, risk_level: 1)
          country2 = create(:country, risk_level: 2)
          create(:world_view_country, world_view: duplicated_world_view, country: country1)
          create(:world_view_country, world_view: duplicated_world_view, country: country2)
          get api_v1_world_views_search_path, params: {
            risk_levels: ["1", "2"]
          }
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response).to eq json_response.uniq
        end
      end

      describe "filter_by_keywordスコープのテスト" do
        let!(:matera_cave_dwellings) { create(:world_view, name: "マテーラの洞窟住居") }
        let!(:civita_di_bagnoregio) { create(:world_view, name: "チヴィタディバニョレージョ") }
        let!(:machu_picchu) { create(:world_view, name: "マチュピチュ") }
        let!(:country_italy) { create(:country, name: "イタリア") }
        let!(:country_peru) { create(:country, name: "ペルー") }
        before do
          create(:world_view_country, world_view: matera_cave_dwellings, country: country_italy)
          create(:world_view_country, world_view: civita_di_bagnoregio, country: country_italy)
          create(:world_view_country, world_view: machu_picchu, country: country_peru)
        end

        it "paramsのkeywordに部分一致する名前のレコードを返すこと" do
          get api_v1_world_views_search_path, params: {
            keyword: "マ"
          }
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response.length).to eq(2)
          expect(json_response.map { |view| view["id"] }).to include(matera_cave_dwellings.id, machu_picchu.id)
        end

        it "paramsのkeywordに部分一致するCountryモデルと関連づけられたレコードを返すこと" do
          get api_v1_world_views_search_path, params: {
            keyword: "イタリア"
          }
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response.length).to eq(2)
          expect(json_response.map { |view| view["id"] }).to include(matera_cave_dwellings.id, civita_di_bagnoregio.id)
        end

        it "返されるレコードが重複しないこと" do
          duplicate_world_view = create(:world_view, name: "重複するレコード")
          create(:world_view_country, world_view: duplicate_world_view, country: country_italy)
          create(:world_view_country, world_view: duplicate_world_view, country: country_peru)
          get api_v1_world_views_search_path, params: {
            keyword: "重複するレコード"
          }
          json = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json).to eq json.uniq
        end
      end

      describe "filter_by_monthのスコープのテスト" do
        it "paramsのmonthsの配列に含まれる月をbest_seasonに持つCountryモデルと関連づけられたレコードを返すこと" do
          world_view1 = create(:world_view, best_season: "12月〜2月")
          world_view2 = create(:world_view, best_season: "3月〜5月 or 9月〜11月")
          world_view3 = create(:world_view, best_season: "6月〜8月")
          get api_v1_world_views_search_path, params: {
            months: ["1月", "3月", "7月"]
          }
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response.length).to eq(3)
          expect(json_response.map { |view| view["id"] }).to include(world_view1.id, world_view2.id, world_view3.id)
        end
      end

      describe "filter_by_country_bmiスコープのテスト" do
        it "paramsのbmi_rangesの範囲に含まれるbmiカラムを持つCountryモデルと関連づけられたレコードを返すこと" do
          world_view1 = create(:world_view)
          world_view2 = create(:world_view)
          world_view3 = create(:world_view)
          create(:world_view_country, world_view: world_view1, country: create(:country, bmi: 23.4))
          create(:world_view_country, world_view: world_view2, country: create(:country, bmi: -18.2))
          create(:world_view_country, world_view: world_view3, country: create(:country, bmi: -40.2))
          get api_v1_world_views_search_path, params: {
            bmi_ranges: ["20%〜30%", "〜-40%"]
          }
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response.length).to eq(2)
          expect(json_response.map { |view| view["id"] }).to include(world_view1.id, world_view3.id)
        end

        it "返されるレコードが重複しないこと" do
          duplicated_world_view = create(:world_view)
          create(:world_view_country, world_view: duplicated_world_view, country: create(:country, bmi: -10.2))
          create(:world_view_country, world_view: duplicated_world_view, country: create(:country, bmi: 1.2))
          get api_v1_world_views_search_path, params: {
            bmi_ranges: ["-20%〜-10%", "0〜10%"]
          }
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response).to eq json_response.uniq
        end
      end
    end

    describe "world_view_sortメソッド内のスコープのテスト" do
      describe "sort_by_latestスコープのテスト" do
        it "レコードが新しい順に取得できること" do
          world_view1 = create(:world_view, created_at: 3.days.ago)
          world_view2 = create(:world_view, created_at: 2.days.ago)
          world_view3 = create(:world_view, created_at: 1.day.ago)
          get api_v1_world_views_search_path, params: {
            sort_criteria: "latest"
          }
          json = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json.pluck("id")).to eq [world_view3, world_view2, world_view1].pluck(:id)
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
          get api_v1_world_views_search_path, params: {
            sort_criteria: "bmi"
          }
          json = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json.pluck("id")).to eq [world_view3, world_view2, world_view1].pluck(:id)
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
          get api_v1_world_views_search_path, params: {
            sort_criteria: "riskLevel"
          }
          json = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json.pluck("id")).to eq [world_view4, world_view3, world_view2, world_view1].pluck(:id)
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
          get api_v1_world_views_search_path, params: {
            sort_criteria: "favorite"
          }
          json = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json.pluck("id")).to eq [world_view3, world_view2, world_view1].pluck(:id)
        end
      end
    end

    it "searchアクション内で発生したエラーが適切に処理されること" do
      allow_any_instance_of(Api::V1::WorldViewsController).to receive(:world_view_filter).and_raise(StandardError, "Filtering error")
      expect(Rails.logger).to receive(:error).with(StandardError)
      expect(Rails.logger).to receive(:error).with("Filtering error")
      expect(Rails.logger).to receive(:error).with(instance_of(String))
      get api_v1_world_views_search_path
      json = JSON.parse(response.body)
      expect(response).to have_http_status(500)
      expect(json["error"]).to eq("絶景モデルのフィルタリング処理に失敗しました。")
    end
  end
end
