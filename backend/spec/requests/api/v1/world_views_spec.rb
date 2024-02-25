require "rails_helper"

RSpec.describe "Api::V1::WorldViews", type: :request do
  describe "GET api/v1/world_views/search" do
    params = {month_range: ["1", "12"], bmi_range: ["-40", "30"], keyword: "", sort_criteria: ""}
    describe "world_view_filterメソッド内のスコープのテスト" do
      describe "filter_by_category_nameスコープのテスト" do
        it "paramsのcategory_namesの配列に含まれる名前のCategoryモデルと関連付けられたレコードを返すこと" do
          world_view1 = create(:world_view)
          world_view2 = create(:world_view)
          category_cave = create(:category, name: "洞窟")
          create(:world_view_category, world_view: world_view1, category: category_cave)
          create(:world_view_category, world_view: world_view2, category: category_cave)
          get api_v1_world_views_search_path, params: params.merge(category_names: ["洞窟"])
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response.length).to eq(2)
          expect(json_response.pluck("id")).to include(world_view1.id, world_view2.id)
        end

        it "返されるレコードが重複しないこと" do
          duplicated_world_view = create(:world_view)
          category1 = create(:category)
          category2 = create(:category)
          create(:world_view_category, world_view: duplicated_world_view, category: category1)
          create(:world_view_category, world_view: duplicated_world_view, category: category2)
          get api_v1_world_views_search_path, params: params.merge(category_names: [category1.name, category2.name])
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
          get api_v1_world_views_search_path, params: params.merge(country_names: ["イタリア"])
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response.length).to eq(2)
          expect(json_response.pluck("id")).to include(world_view1.id, world_view2.id)
        end

        it "返されるレコードが重複しないこと" do
          duplicated_world_view = create(:world_view)
          country1 = create(:country)
          country2 = create(:country)
          create(:world_view_country, world_view: duplicated_world_view, country: country1)
          create(:world_view_country, world_view: duplicated_world_view, country: country2)
          get api_v1_world_views_search_path, params: params.merge(country_names: [country1.name, country2.name])
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
          get api_v1_world_views_search_path, params: params.merge(characteristic_names: ["幻想・神秘的"])
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response.length).to eq(2)
          expect(json_response.pluck("id")).to include(world_view1.id, world_view2.id)
        end

        it "返されるレコードが重複しないこと" do
          duplicated_world_view = create(:world_view)
          characteristic1 = create(:characteristic)
          characteristic2 = create(:characteristic)
          create(:world_view_characteristic, world_view: duplicated_world_view, characteristic: characteristic1)
          create(:world_view_characteristic, world_view: duplicated_world_view, characteristic: characteristic2)
          get api_v1_world_views_search_path, params: params.merge(characteristic_names: [characteristic1.name, characteristic2.name])
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response).to eq json_response.uniq
        end
      end

      describe ".filter_by_country_risk_level" do
        let!(:world_view1) { create(:world_view) }
        let!(:world_view2) { create(:world_view) }
        let!(:country1) { create(:country, risk_level: 1) }
        let!(:neighboring_country1) { create(:country, risk_level: 1) }
        let!(:country2) { create(:country, risk_level: 2) }

        before do
          create(:world_view_country, world_view: world_view1, country: country1)
          create(:world_view_country, world_view: world_view1, country: neighboring_country1)
          create(:world_view_country, world_view: world_view2, country: country2)
        end

        context "risk_levelが'1'の場合" do
          it "risk_levelが1のCountryモデルと関連づいたレコードが返されること" do
            get api_v1_world_views_search_path, params: params.merge(risk_level: "1")
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.length).to eq(1)
            expect(json_response.pluck("id")).to include world_view1.id
          end

          it "返されるレコードが重複しないこと" do
            get api_v1_world_views_search_path, params: params.merge(risk_level: "1")
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response).to eq json_response.uniq
          end
        end

        context "risk_levelが'2'の場合" do
          it "risk_levelが2のCountryモデルと関連づいたレコードが返されること" do
            get api_v1_world_views_search_path, params: params.merge(risk_level: "2")
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.length).to eq(1)
            expect(json_response.pluck("id")).to include world_view2.id
          end
        end

        context "risk_levelがnilの場合" do
          it "レコードが全件返されること" do
            world_view3 = create(:world_view)
            get api_v1_world_views_search_path, params: params.merge(risk_level: nil)
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.length).to eq(3)
            expect(json_response.pluck("id")).to include world_view1.id, world_view2.id, world_view3.id
          end
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
          get api_v1_world_views_search_path, params: params.merge(keyword: "マ")
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response.length).to eq(2)
          expect(json_response.pluck("id")).to include(matera_cave_dwellings.id, machu_picchu.id)
        end

        it "paramsのkeywordに部分一致するCountryモデルと関連づけられたレコードを返すこと" do
          get api_v1_world_views_search_path, params: params.merge(keyword: "イタリア")
          json_response = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json_response.length).to eq(2)
          expect(json_response.pluck("id")).to include(matera_cave_dwellings.id, civita_di_bagnoregio.id)
        end

        it "返されるレコードが重複しないこと" do
          duplicate_world_view = create(:world_view, name: "重複するレコード")
          create(:world_view_country, world_view: duplicate_world_view, country: country_italy)
          create(:world_view_country, world_view: duplicate_world_view, country: country_peru)
          get api_v1_world_views_search_path, params: params.merge(keyword: "重複するレコード")
          json = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json).to eq json.uniq
        end
      end

      describe ".filter_by_month" do
        let!(:world_view1) { create(:world_view, best_season: "2月〜6月") }
        let!(:world_view2) { create(:world_view, best_season: "4月〜6月 or 8月〜12月") }
        let!(:world_view3) { create(:world_view, best_season: "9月〜1月") }

        context "month_rangeが['1', '4']である場合" do
          it "best_seasonが1〜4月の範囲を含むレコードが返されること" do
            get api_v1_world_views_search_path, params: params.merge(month_range: ["1", "4"])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.length).to be 3
            expect(json_response.pluck("id")).to include world_view1.id, world_view2.id, world_view3.id
          end
        end

        context "month_rangeが['5', '8']である場合" do
          it "best_seasonが1〜4月の範囲を含むレコードが返されること" do
            get api_v1_world_views_search_path, params: params.merge(month_range: ["5", "8"])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.length).to be 2
            expect(json_response.pluck("id")).to include world_view1.id, world_view2.id
          end
        end

        context "month_rangeが['9', '12']である場合" do
          it "best_seasonが1〜4月の範囲を含むレコードが返されること" do
            get api_v1_world_views_search_path, params: params.merge(month_range: ["9", "12"])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.length).to be 2
            expect(json_response.pluck("id")).to include world_view2.id, world_view3.id
          end
        end

        context "month_rangeが['1', '12']である場合" do
          it "全てのレコードが返されること" do
            world_view4 = create(:world_view)
            get api_v1_world_views_search_path, params: params.merge(month_range: ["1", "12"])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.length).to be 4
            expect(json_response.pluck("id")).to include world_view1.id, world_view2.id, world_view3.id, world_view4.id
          end
        end
      end

      describe ".filter_by_country_bmi" do
        let!(:world_view1) { create(:world_view) }
        let!(:world_view2) { create(:world_view) }
        let!(:country1) { create(:country, bmi: 6.0) }
        let!(:country2) { create(:country, bmi: 18.0) }

        before do
          create(:world_view_country, world_view: world_view1, country: country1)
          create(:world_view_country, world_view: world_view1, country: country2)
          create(:world_view_country, world_view: world_view2, country: country2)
        end

        context "bmi_rangeが[0, 10]である場合" do
          it "bmi_rangeが0〜10の範囲内のCountryモデルと関連づいたレコードが返されること" do
            get api_v1_world_views_search_path, params: params.merge(bmi_range: ["0", "10"])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.length).to eq(1)
            expect(json_response.pluck("id")).to include world_view1.id
          end
        end

        context "bmi_rangeが[10, 20]である場合" do
          it "bmi_rangeが10〜20の範囲内のCountryモデルと関連づいたレコードが返されること" do
            get api_v1_world_views_search_path, params: params.merge(bmi_range: ["10", "20"])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.length).to eq(2)
            expect(json_response.pluck("id")).to include world_view1.id, world_view2.id
          end
        end

        context "bmi_rangeが[0, 20]である場合" do
          it "bmi_rangeが0〜20の範囲内のCountryモデルと関連づいたレコードが返されること" do
            get api_v1_world_views_search_path, params: params.merge(bmi_range: ["0", "20"])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.length).to eq(2)
            expect(json_response.pluck("id")).to include world_view1.id, world_view2.id
          end

          it "返されるレコードが重複しないこと" do
            get api_v1_world_views_search_path, params: params.merge(bmi_range: ["0", "20"])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response).to eq json_response.uniq
          end
        end

        context "bmi_rangeが['-40', '30']である場合" do
          it "レコードが全件返されること" do
            world_view3 = create(:world_view)
            get api_v1_world_views_search_path, params: params
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.length).to eq(3)
            expect(json_response.pluck("id")).to include world_view1.id, world_view2.id, world_view3.id
          end
        end
      end
    end

    describe "world_view_sortメソッド内のスコープのテスト" do
      describe "sort_by_latestスコープのテスト" do
        it "レコードが新しい順に取得できること" do
          world_view1 = create(:world_view, created_at: 3.days.ago)
          world_view2 = create(:world_view, created_at: 2.days.ago)
          world_view3 = create(:world_view, created_at: 1.day.ago)
          get api_v1_world_views_search_path, params: params.merge(sort_criteria: "latest")
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
          get api_v1_world_views_search_path, params: params.merge(sort_criteria: "bmi")
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
          get api_v1_world_views_search_path, params: params.merge(sort_criteria: "riskLevel")
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
          get api_v1_world_views_search_path, params: params.merge(sort_criteria: "favorite")
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
      get api_v1_world_views_search_path, params: params
      json = JSON.parse(response.body)
      expect(response).to have_http_status(500)
      expect(json["error"]).to eq("絶景モデルのフィルタリング処理に失敗しました。")
    end
  end
end
