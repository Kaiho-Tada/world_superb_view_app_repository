require "rails_helper"

RSpec.describe "Api::V1::SuperbViews", type: :request do
  describe "GET /index" do
    before do
      create_list(:superb_view, 5)
    end
    it "SuperbViewsが全件取得できること" do
      get api_v1_superb_views_path
      @json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(@json.length).to eq 5
    end
  end

  describe "GET api/v1/superb_views/search" do
    let!(:matera_cave_dwellings) { create(:superb_view, name: "マテーラの洞窟住居") }
    let!(:civita_di_bagnoregio) { create(:superb_view, name: "チヴィタディバニョレージョ") }
    let!(:machu_picchu) { create(:superb_view, name: "マチュピチュ") }

    describe "filter_by_category_nameスコープのテスト" do
      let!(:category_city) { create(:category, name: "都市") }
      let!(:category_cave) { create(:category, name: "洞窟") }
      before do
        create(:superb_view_category, superb_view: matera_cave_dwellings, category: category_cave)
        create(:superb_view_category, superb_view: civita_di_bagnoregio, category: category_city)
        create(:superb_view_category, superb_view: machu_picchu, category: category_city)
      end

      it "paramsで渡されたcategory_namesに一致するカテゴリー名を持つSuperbViewを返すこと" do
        get api_v1_superb_views_search_path, params: {
          category_names: [category_city.name]
        }
        superb_views = [civita_di_bagnoregio, machu_picchu]
        superb_views_json = superb_views.to_json(include: [:categories, :characteristics, { countries: { include: :state } }],
                                                 methods: [:image_url])
        expect(response).to have_http_status(200)
        expect(response.body).to eq superb_views_json
      end

      it "返されるSuperbViewが重複しないこと" do
        duplicated_superb_view = create(:superb_view)
        create(:superb_view_category, superb_view: duplicated_superb_view, category: category_city)
        create(:superb_view_category, superb_view: duplicated_superb_view, category: category_cave)

        get api_v1_superb_views_search_path, params: {
          category_names: [category_city.name, category_cave.name]
        }
        json = JSON.parse(response.body)
        expect(response).to have_http_status(200)
        expect(json).to eq json.uniq
      end
    end

    describe "filter_by_country_nameスコープのテスト" do
      let!(:country_italy) { create(:country, name: "イタリア") }
      let!(:country_peru) { create(:country, name: "ペルー") }
      before do
        create(:superb_view_country, superb_view: matera_cave_dwellings, country: country_italy)
        create(:superb_view_country, superb_view: civita_di_bagnoregio, country: country_italy)
        create(:superb_view_country, superb_view: machu_picchu, country: country_peru)
      end

      it "paramsで渡されたcountry_namesに一致する国名を持つSuperbViewを返すこと" do
        get api_v1_superb_views_search_path, params: {
          country_names: [country_italy.name]
        }
        superb_views = [matera_cave_dwellings, civita_di_bagnoregio]
        superb_views_json = superb_views.to_json(include: [:categories, :characteristics, { countries: { include: :state } }],
                                                 methods: [:image_url])
        expect(response).to have_http_status(200)
        expect(response.body).to eq superb_views_json
      end

      it "返されるSuperbViewが重複しないこと" do
        duplicated_superb_view = create(:superb_view)
        create(:superb_view_country, superb_view: duplicated_superb_view, country: country_italy)
        create(:superb_view_country, superb_view: duplicated_superb_view, country: country_peru)

        get api_v1_superb_views_search_path, params: {
          country_names: [country_italy.name, country_peru.name]
        }
        json = JSON.parse(response.body)
        expect(response).to have_http_status(200)
        expect(json).to eq json.uniq
      end
    end

    describe "filter_by_characteristic_nameスコープのテスト" do
      let!(:characteristic_historic) { create(:characteristic, name: "歴史・文化的") }
      let!(:characteristic_fantasy) { create(:characteristic, name: "幻想・神秘的") }
      before do
        create(:superb_view_characteristic, superb_view: matera_cave_dwellings, characteristic: characteristic_fantasy)
        create(:superb_view_characteristic, superb_view: civita_di_bagnoregio, characteristic: characteristic_historic)
        create(:superb_view_characteristic, superb_view: machu_picchu, characteristic: characteristic_historic)
      end

      it "paramsで渡されたcharacteristic_namesに一致する属性名を持つSuperbViewを返すこと" do
        get api_v1_superb_views_search_path, params: {
          characteristic_names: [characteristic_historic.name]
        }
        superb_views = [civita_di_bagnoregio, machu_picchu]
        superb_views_json = superb_views.to_json(include: [:categories, :characteristics, { countries: { include: :state } }],
                                                 methods: [:image_url])
        expect(response).to have_http_status(200)
        expect(response.body).to eq superb_views_json
      end

      it "返されるSuperbViewが重複しないこと" do
        duplicated_superb_view = create(:superb_view)
        create(:superb_view_characteristic, superb_view: duplicated_superb_view, characteristic: characteristic_historic)
        create(:superb_view_characteristic, superb_view: duplicated_superb_view, characteristic: characteristic_fantasy)

        get api_v1_superb_views_search_path, params: {
          characteristic_names: [characteristic_historic.name, characteristic_fantasy.name]
        }
        json = JSON.parse(response.body)
        expect(response).to have_http_status(200)
        expect(json).to eq json.uniq
      end
    end

    describe "filter_by_country_risk_levelスコープのテスト" do
      let!(:country_italy) { create(:country, name: "イタリア", risk_level: 0) }
      let!(:country_peru) { create(:country, name: "ペルー", risk_level: 1) }
      before do
        create(:superb_view_country, superb_view: matera_cave_dwellings, country: country_italy)
        create(:superb_view_country, superb_view: civita_di_bagnoregio, country: country_italy)
        create(:superb_view_country, superb_view: machu_picchu, country: country_peru)
      end

      it "paramsで渡されたrisk_levelsに一致する国名を持つSuperbViewを返すこと" do
        get api_v1_superb_views_search_path, params: {
          risk_levels: ["0"]
        }
        superb_views = [matera_cave_dwellings, civita_di_bagnoregio]
        superb_views_json = superb_views.to_json(include: [:categories, :characteristics, { countries: { include: :state } }],
                                                 methods: [:image_url])
        expect(response).to have_http_status(200)
        expect(response.body).to eq superb_views_json
      end

      it "返されるSuperbViewが重複しないこと" do
        duplicated_superb_view = create(:superb_view)
        create(:superb_view_country, superb_view: duplicated_superb_view, country: country_italy)
        create(:superb_view_country, superb_view: duplicated_superb_view, country: country_peru)

        get api_v1_superb_views_search_path, params: {
          risk_levels: ["0", "1"]
        }
        json = JSON.parse(response.body)
        expect(response).to have_http_status(200)
        expect(json).to eq json.uniq
      end
    end

    describe "filter_by_keywordスコープのテスト" do
      let!(:country_italy) { create(:country, name: "イタリア") }
      let!(:country_peru) { create(:country, name: "ペルー") }
      before do
        create(:superb_view_country, superb_view: matera_cave_dwellings, country: country_italy)
        create(:superb_view_country, superb_view: civita_di_bagnoregio, country: country_italy)
        create(:superb_view_country, superb_view: machu_picchu, country: country_peru)
      end

      it "paramsで受け取ったkeywordに部分一致する名前を持つSuperbViewを返すこと" do
        get api_v1_superb_views_search_path, params: {
          keyword: "マ"
        }
        superb_views = [matera_cave_dwellings, machu_picchu]
        superb_views_json = superb_views.to_json(include: [:categories, :characteristics, { countries: { include: :state } }],
                                                 methods: [:image_url])
        expect(response).to have_http_status(200)
        expect(response.body).to eq superb_views_json
      end

      it "paramsで受け取ったkeywordに部分一致する国名を持つSuperbViewを返すこと" do
        get api_v1_superb_views_search_path, params: {
          keyword: "イタリア"
        }
        superb_views = [matera_cave_dwellings, civita_di_bagnoregio]
        superb_views_json = superb_views.to_json(include: [:categories, :characteristics, { countries: { include: :state } }],
                                                 methods: [:image_url])
        expect(response).to have_http_status(200)
        expect(response.body).to eq superb_views_json
      end

      it "返されるSuperbViewが重複しないこと" do
        duplicate_superb_view = create(:superb_view, name: "重複する絶景")
        create(:superb_view_country, superb_view: duplicate_superb_view, country: country_italy)
        create(:superb_view_country, superb_view: duplicate_superb_view, country: country_peru)

        get api_v1_superb_views_search_path, params: {
          keyword: "重複する絶景"
        }
        json = JSON.parse(response.body)
        expect(response).to have_http_status(200)
        expect(json).to eq json.uniq
      end
    end
  end
end
