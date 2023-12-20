require "rails_helper"

RSpec.describe "Api::V1::WorldViews", type: :request do
  describe "GET /index" do
    before do
      create_list(:world_view, 5)
    end
    it "WorldViewsが全件取得できること" do
      get api_v1_world_views_path
      @json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(@json.length).to eq 5
    end
  end

  describe "GET api/v1/world_views/search" do
    let!(:matera_cave_dwellings) { create(:world_view, name: "マテーラの洞窟住居") }
    let!(:civita_di_bagnoregio) { create(:world_view, name: "チヴィタディバニョレージョ") }
    let!(:machu_picchu) { create(:world_view, name: "マチュピチュ") }

    describe "filter_by_category_nameスコープのテスト" do
      let!(:category_city) { create(:category, name: "都市") }
      let!(:category_cave) { create(:category, name: "洞窟") }
      before do
        create(:world_view_category, world_view: matera_cave_dwellings, category: category_cave)
        create(:world_view_category, world_view: civita_di_bagnoregio, category: category_city)
        create(:world_view_category, world_view: machu_picchu, category: category_city)
      end

      it "paramsで渡されたcategory_namesに一致するカテゴリー名を持つWorldViewを返すこと" do
        get api_v1_world_views_search_path, params: {
          category_names: [category_city.name]
        }
        world_views = [civita_di_bagnoregio, machu_picchu]
        world_views_json = world_views.to_json(include: [:categories, :characteristics, :world_view_favorites,
                                                         { countries: { include: :state } }],
                                               methods: [:image_url])
        expect(response).to have_http_status(200)
        expect(response.body).to eq world_views_json
      end

      it "返されるWorldViewが重複しないこと" do
        duplicated_world_view = create(:world_view)
        create(:world_view_category, world_view: duplicated_world_view, category: category_city)
        create(:world_view_category, world_view: duplicated_world_view, category: category_cave)

        get api_v1_world_views_search_path, params: {
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
        create(:world_view_country, world_view: matera_cave_dwellings, country: country_italy)
        create(:world_view_country, world_view: civita_di_bagnoregio, country: country_italy)
        create(:world_view_country, world_view: machu_picchu, country: country_peru)
      end

      it "paramsで渡されたcountry_namesに一致する国名を持つWorldViewを返すこと" do
        get api_v1_world_views_search_path, params: {
          country_names: [country_italy.name]
        }
        world_views = [matera_cave_dwellings, civita_di_bagnoregio]
        world_views_json = world_views.to_json(include: [:categories, :characteristics, :world_view_favorites,
                                                         { countries: { include: :state } }],
                                               methods: [:image_url])
        expect(response).to have_http_status(200)
        expect(response.body).to eq world_views_json
      end

      it "返されるWorldViewが重複しないこと" do
        duplicated_world_view = create(:world_view)
        create(:world_view_country, world_view: duplicated_world_view, country: country_italy)
        create(:world_view_country, world_view: duplicated_world_view, country: country_peru)

        get api_v1_world_views_search_path, params: {
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
        create(:world_view_characteristic, world_view: matera_cave_dwellings, characteristic: characteristic_fantasy)
        create(:world_view_characteristic, world_view: civita_di_bagnoregio, characteristic: characteristic_historic)
        create(:world_view_characteristic, world_view: machu_picchu, characteristic: characteristic_historic)
      end

      it "paramsで渡されたcharacteristic_namesに一致する属性名を持つWorldViewを返すこと" do
        get api_v1_world_views_search_path, params: {
          characteristic_names: [characteristic_historic.name]
        }
        world_views = [civita_di_bagnoregio, machu_picchu]
        world_views_json = world_views.to_json(include: [:categories, :characteristics, :world_view_favorites,
                                                         { countries: { include: :state } }],
                                               methods: [:image_url])
        expect(response).to have_http_status(200)
        expect(response.body).to eq world_views_json
      end

      it "返されるWorldViewが重複しないこと" do
        duplicated_world_view = create(:world_view)
        create(:world_view_characteristic, world_view: duplicated_world_view, characteristic: characteristic_historic)
        create(:world_view_characteristic, world_view: duplicated_world_view, characteristic: characteristic_fantasy)

        get api_v1_world_views_search_path, params: {
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
        create(:world_view_country, world_view: matera_cave_dwellings, country: country_italy)
        create(:world_view_country, world_view: civita_di_bagnoregio, country: country_italy)
        create(:world_view_country, world_view: machu_picchu, country: country_peru)
      end

      it "paramsで渡されたrisk_levelsに一致する国名を持つWorldViewを返すこと" do
        get api_v1_world_views_search_path, params: {
          risk_levels: ["0"]
        }
        world_views = [matera_cave_dwellings, civita_di_bagnoregio]
        world_views_json = world_views.to_json(include: [:categories, :characteristics, :world_view_favorites,
                                                         { countries: { include: :state } }],
                                               methods: [:image_url])
        expect(response).to have_http_status(200)
        expect(response.body).to eq world_views_json
      end

      it "返されるWorldViewが重複しないこと" do
        duplicated_world_view = create(:world_view)
        create(:world_view_country, world_view: duplicated_world_view, country: country_italy)
        create(:world_view_country, world_view: duplicated_world_view, country: country_peru)

        get api_v1_world_views_search_path, params: {
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
        create(:world_view_country, world_view: matera_cave_dwellings, country: country_italy)
        create(:world_view_country, world_view: civita_di_bagnoregio, country: country_italy)
        create(:world_view_country, world_view: machu_picchu, country: country_peru)
      end

      it "paramsで受け取ったkeywordに部分一致する名前を持つWorldViewを返すこと" do
        get api_v1_world_views_search_path, params: {
          keyword: "マ"
        }
        world_views = [matera_cave_dwellings, machu_picchu]
        world_views_json = world_views.to_json(include: [:categories, :characteristics, :world_view_favorites,
                                                         { countries: { include: :state } }],
                                               methods: [:image_url])
        expect(response).to have_http_status(200)
        expect(response.body).to eq world_views_json
      end

      it "paramsで受け取ったkeywordに部分一致する国名を持つWorldViewを返すこと" do
        get api_v1_world_views_search_path, params: {
          keyword: "イタリア"
        }
        world_views = [matera_cave_dwellings, civita_di_bagnoregio]
        world_views_json = world_views.to_json(include: [:categories, :characteristics, :world_view_favorites,
                                                         { countries: { include: :state } }],
                                               methods: [:image_url])
        expect(response).to have_http_status(200)
        expect(response.body).to eq world_views_json
      end

      it "返されるWorldViewが重複しないこと" do
        duplicate_world_view = create(:world_view, name: "重複する絶景")
        create(:world_view_country, world_view: duplicate_world_view, country: country_italy)
        create(:world_view_country, world_view: duplicate_world_view, country: country_peru)

        get api_v1_world_views_search_path, params: {
          keyword: "重複する絶景"
        }
        json = JSON.parse(response.body)
        expect(response).to have_http_status(200)
        expect(json).to eq json.uniq
      end
    end

    describe "filter_by_monthのスコープのテスト" do
      it "paramsで受け取ったmonthsの月をbest_seasonに持つWorldViewを返すこと" do
        world_view1 = create(:world_view, best_season: "12月〜2月")
        world_view2 = create(:world_view, best_season: "3月〜5月 or 9月〜11月")
        world_view3 = create(:world_view, best_season: "6月〜8月")

        get api_v1_world_views_search_path, params: {
          months: ["1月", "3月", "7月"]
        }
        world_views = [world_view1, world_view2, world_view3]
        world_views_json = world_views.to_json(include: [:categories, :characteristics, :world_view_favorites,
                                                         { countries: { include: :state } }],
                                               methods: [:image_url])
        expect(response).to have_http_status(200)
        expect(response.body).to eq world_views_json
      end
    end
  end
end
