require "rails_helper"

RSpec.describe "Api::V1::WorldViews", type: :request do
  describe "GET api/v1/world_views/search" do
    params = { month_range: ["1", "12"], bmi_range: ["-40", "30"], keyword: "", sort_criteria: "" }
    describe "#world_view_filter" do
      describe ".filter_by_category_name" do
        let!(:world_view1) { create(:world_view) }
        let!(:world_view2) { create(:world_view) }
        let!(:category1) { create(:category) }
        let!(:category2) { create(:category) }

        before do
          create(:world_view_category, world_view: world_view1, category: category1)
          create(:world_view_category, world_view: world_view1, category: category2)
          create(:world_view_category, world_view: world_view2, category: category2)
        end

        context "category_namesの配列がcategory1の名前を含む場合" do
          it "category1と関連付けされたレコードが返されること" do
            get api_v1_world_views_search_path, params: params.merge(category_names: [category1.name])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.pluck("id")).to include world_view1.id
            expect(json_response.length).to eq(1)
          end
        end

        context "category_namesの配列がcategory2の名前を含む場合" do
          it "category2と関連付けされたレコードが返されること" do
            get api_v1_world_views_search_path, params: params.merge(category_names: [category2.name])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.pluck("id")).to include world_view1.id, world_view2.id
            expect(json_response.length).to eq(2)
          end
        end

        context "category_namesの配列がcategory1とcategory2の名前を含む場合" do
          it "category1とcategory2に関連付けされたレコードが返されること" do
            get api_v1_world_views_search_path, params: params.merge(category_names: [category1.name, category2.name])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.pluck("id")).to include world_view1.id, world_view2.id
            expect(json_response.length).to eq(2)
          end

          it "返されるレコードが重複しないこと" do
            get api_v1_world_views_search_path, params: params.merge(category_names: [category1.name, category2.name])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response).to eq json_response.uniq
          end
        end

        context "ヒットするレコードが存在しない場合" do
          it "空の配列が返されること" do
            get api_v1_world_views_search_path, params: params.merge(category_names: ["unregistered_name"])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response).to eq []
          end
        end
      end

      describe ".filter_by_country_name" do
        let!(:world_view1) { create(:world_view) }
        let!(:world_view2) { create(:world_view) }
        let!(:country1) { create(:country) }
        let!(:country2) { create(:country) }

        before do
          create(:world_view_country, world_view: world_view1, country: country1)
          create(:world_view_country, world_view: world_view1, country: country2)
          create(:world_view_country, world_view: world_view2, country: country2)
        end

        context "country_namesの配列がcountry1の名前を含む場合" do
          it "country1と関連付けされたレコードが返されること" do
            get api_v1_world_views_search_path, params: params.merge(country_names: [country1.name])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.pluck("id")).to include world_view1.id
            expect(json_response.length).to eq(1)
          end
        end

        context "country_namesの配列がcountry2の名前を含む場合" do
          it "country2と関連付けされたレコードが返されること" do
            get api_v1_world_views_search_path, params: params.merge(country_names: [country2.name])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.pluck("id")).to include world_view1.id, world_view2.id
            expect(json_response.length).to eq(2)
          end
        end

        context "country_namesの配列がcountry1とcountry2の名前を含む場合" do
          it "country1とcountry2に関連付けされたレコードが返されること" do
            get api_v1_world_views_search_path, params: params.merge(country_names: [country1.name, country2.name])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.pluck("id")).to include world_view1.id, world_view2.id
            expect(json_response.length).to eq(2)
          end

          it "返されるレコードが重複しないこと" do
            get api_v1_world_views_search_path, params: params.merge(country_names: [country1.name, country2.name])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response).to eq json_response.uniq
          end
        end

        context "ヒットするレコードが存在しない場合" do
          it "空の配列が返されること" do
            get api_v1_world_views_search_path, params: params.merge(country_names: ["unregistered_name"])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response).to eq []
          end
        end
      end

      describe ".filter_by_characteristic_name" do
        let!(:world_view1) { create(:world_view) }
        let!(:world_view2) { create(:world_view) }
        let!(:characteristic1) { create(:characteristic) }
        let!(:characteristic2) { create(:characteristic) }

        before do
          create(:world_view_characteristic, world_view: world_view1, characteristic: characteristic1)
          create(:world_view_characteristic, world_view: world_view1, characteristic: characteristic2)
          create(:world_view_characteristic, world_view: world_view2, characteristic: characteristic2)
        end

        context "characteristic_namesの配列がcharacteristic1の名前を含む場合" do
          it "characteristic1と関連付けされたレコードが返されること" do
            get api_v1_world_views_search_path, params: params.merge(characteristic_names: [characteristic1.name])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.pluck("id")).to include world_view1.id
            expect(json_response.length).to eq(1)
          end
        end

        context "characteristic_namesの配列がcharacteristic2の名前を含む場合" do
          it "characteristic2と関連付けされたレコードが返されること" do
            get api_v1_world_views_search_path, params: params.merge(characteristic_names: [characteristic2.name])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.pluck("id")).to include world_view1.id, world_view2.id
            expect(json_response.length).to eq(2)
          end
        end

        context "characteristic_namesの配列がcharacteristic1とcharacteristic2の名前を含む場合" do
          it "characteristic1とcharacteristic2に関連付けされたレコードが返されること" do
            get api_v1_world_views_search_path, params: params.merge(characteristic_names: [characteristic1.name, characteristic2.name])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.pluck("id")).to include world_view1.id, world_view2.id
            expect(json_response.length).to eq(2)
          end

          it "返されるレコードが重複しないこと" do
            get api_v1_world_views_search_path, params: params.merge(characteristic_names: [characteristic1.name, characteristic2.name])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response).to eq json_response.uniq
          end
        end

        context "ヒットするレコードが存在しない場合" do
          it "空の配列が返されること" do
            get api_v1_world_views_search_path, params: params.merge(characteristic_names: ["unregistered_name"])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response).to eq []
          end
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

        context "ヒットするレコードが存在しない場合" do
          it "空の配列が返されること" do
            get api_v1_world_views_search_path, params: params.merge(risk_level: "5")
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response).to eq []
          end
        end
      end

      describe ".filter_by_keyword" do
        let!(:world_view1) { create(:world_view, name: "ワシントン記念塔") }
        let!(:world_view2) { create(:world_view, name: "アメリカンロッキー") }
        let!(:country) { create(:country, name: "アメリカ") }

        before do
          create(:world_view_country, world_view: world_view1, country:)
          create(:world_view_country, world_view: world_view2, country:)
        end

        context "引数のkeywordが'ワシントン'である場合" do
          it "'ワシントン'に部分一致する名前のレコードが返されること" do
            get api_v1_world_views_search_path, params: params.merge(keyword: "ワシントン")
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.pluck("id")).to include world_view1.id
            expect(json_response.length).to eq(1)
          end
        end

        context "引数のkeywordが'ロッキー'である場合" do
          it "'ロッキー'に部分一致する名前のレコードが返されること" do
            get api_v1_world_views_search_path, params: params.merge(keyword: "ロッキー")
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.pluck("id")).to include world_view2.id
            expect(json_response.length).to eq(1)
          end
        end

        context "引数のkeywordが'アメリカ'である場合" do
          it "国名が引数のkeywordに部分一致するCountryモデルと関連付いたレコードが返されること" do
            get api_v1_world_views_search_path, params: params.merge(keyword: "アメリカ")
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.pluck("id")).to include world_view1.id, world_view2.id
            expect(json_response.length).to be 2
          end

          it "返されるレコードが重複しないこと" do
            get api_v1_world_views_search_path, params: params.merge(keyword: "アメリカ")
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response).to eq json_response.uniq
          end
        end

        context "ヒットするレコードが存在しない場合" do
          it "空の配列が返されること" do
            get api_v1_world_views_search_path, params: params.merge(keyword: "unregistered_name")
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response).to eq []
          end
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

        context "ヒットするレコードが存在しない場合" do
          it "空の配列が返されること" do
            get api_v1_world_views_search_path, params: params.merge(month_range: ["13", "14"])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response).to eq []
          end
        end
      end

      describe ".filter_by_country_bmi" do
        let!(:world_view1) { create(:world_view) }
        let!(:world_view2) { create(:world_view) }
        let!(:country1) { create(:country, bmi: 0.0) }
        let!(:country2) { create(:country, bmi: 18.0) }

        before do
          create(:world_view_country, world_view: world_view1, country: country1)
          create(:world_view_country, world_view: world_view1, country: country2)
          create(:world_view_country, world_view: world_view2, country: country2)
        end

        context "bmi_rangeが[0, 0]である場合" do
          it "bmi_rangeが0のCountryモデルと関連づいたレコードが返されること" do
            get api_v1_world_views_search_path, params: params.merge(bmi_range: ["0", "0"])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response.length).to eq(1)
            expect(json_response.pluck("id")).to include world_view1.id
          end
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

        context "ヒットするレコードが存在しない場合" do
          it "空の配列が返されること" do
            get api_v1_world_views_search_path, params: params.merge(bmi_range: ["40", "50"])
            expect(response).to have_http_status(200)
            json_response = JSON.parse(response.body)
            expect(json_response).to eq []
          end
        end
      end
    end

    describe "#world_view_sort" do
      context "sort_criteriaが'latest'の場合" do
        let!(:world_view1) { create(:world_view, created_at: 3.days.ago) }
        let!(:world_view2) { create(:world_view, created_at: 2.days.ago) }
        let!(:world_view3) { create(:world_view, created_at: 1.day.ago) }

        before do
          get api_v1_world_views_search_path, params: params.merge(sort_criteria: "latest")
        end

        it "新しい順にレコードが返されること" do
          json = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json.pluck("id")).to eq [world_view3, world_view2, world_view1].pluck(:id)
        end
      end

      context "sort_criteriaが'bmi'の場合" do
        let!(:world_view1) {  create(:world_view) }
        let!(:world_view2) {  create(:world_view) }
        let!(:world_view3) {  create(:world_view) }

        before do
          create(:world_view_country, world_view: world_view1, country: create(:country, bmi: 15.0))
          create(:world_view_country, world_view: world_view2, country: create(:country, bmi: 1.0))
          create(:world_view_country, world_view: world_view3, country: create(:country, bmi: -20.5))
        end

        it "関連のCountryのBMIの値が低い順にレコードが返されること" do
          get api_v1_world_views_search_path, params: params.merge(sort_criteria: "bmi")
          json = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json.pluck("id")).to eq [world_view3, world_view2, world_view1].pluck(:id)
        end

        it "返すレコードが重複している場合はBMI値の低いCountryモデルと関連付いたレコードが返されること" do
          create(:world_view_country, world_view: world_view1, country: create(:country, bmi: -40.0))
          get api_v1_world_views_search_path, params: params.merge(sort_criteria: "bmi")
          json = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json.pluck("id")).to eq [world_view1, world_view3, world_view2].pluck(:id)
        end
      end

      context "sort_criteriaが'riskLevel'の場合" do
        let!(:world_view1) {  create(:world_view) }
        let!(:world_view2) {  create(:world_view) }
        let!(:world_view3) {  create(:world_view) }

        before do
          create(:world_view_country, world_view: world_view1, country: create(:country, risk_level: 3))
          create(:world_view_country, world_view: world_view2, country: create(:country, risk_level: 2))
          create(:world_view_country, world_view: world_view3, country: create(:country, risk_level: 1))
        end

        it "関連のCountryのrisk_levelの値が低い順にレコードが返されること" do
          get api_v1_world_views_search_path, params: params.merge(sort_criteria: "riskLevel")
          json = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json.pluck("id")).to eq [world_view3, world_view2, world_view1].pluck(:id)
        end

        it "返すレコードが重複している場合はリスクレベルの低いCountryモデルと関連付いたレコードが返されること" do
          create(:world_view_country, world_view: world_view1, country: create(:country, risk_level: 0))
          get api_v1_world_views_search_path, params: params.merge(sort_criteria: "riskLevel")
          json = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json.pluck("id")).to eq [world_view1, world_view3, world_view2].pluck(:id)
        end
      end

      context "sort_criteriaが'favorite'の場合" do
        let!(:world_view1) {  create(:world_view) }
        let!(:world_view2) {  create(:world_view) }
        let!(:world_view3) {  create(:world_view) }

        before do
          create(:world_view_favorite, world_view: world_view2, user: create(:user))
          create(:world_view_favorite, world_view: world_view3, user: create(:user))
          create(:world_view_favorite, world_view: world_view3, user: create(:user))
          get api_v1_world_views_search_path, params: params.merge(sort_criteria: "favorite")
        end

        it "いいねの数が多い順にレコードが返されること" do
          json = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(json.pluck("id")).to eq [world_view3, world_view2, world_view1].pluck(:id)
        end
      end
    end
  end
end
