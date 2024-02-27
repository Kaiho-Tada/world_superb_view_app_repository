require "rails_helper"

RSpec.describe WorldView, type: :model do
  describe "association test" do
    it { is_expected.to have_many(:world_view_categories).dependent(:destroy) }
    it { is_expected.to have_many(:categories).through(:world_view_categories) }
    it { is_expected.to have_many(:world_view_countries).dependent(:destroy) }
    it { is_expected.to have_many(:countries).through(:world_view_countries) }
    it { is_expected.to have_many(:world_view_characteristics).dependent(:destroy) }
    it { is_expected.to have_many(:characteristics).through(:world_view_characteristics) }
    it { is_expected.to have_many(:world_view_favorites).dependent(:destroy) }
    it { is_expected.to have_many(:users).through(:world_view_favorites) }
    it { is_expected.to have_many(:world_view_videos).dependent(:destroy) }
    it { is_expected.to have_many(:videos).through(:world_view_videos) }
  end

  describe "validation test" do
    it { should validate_presence_of(:name) }
    it { should validate_length_of(:name).is_at_most(30) }
    it { should validate_presence_of(:best_season) }
    it { should validate_length_of(:best_season).is_at_most(30) }
  end

  describe "method test" do
    describe ".extract_months_range" do
      it "引数の期間が数字に展開されること" do
        expect(WorldView.extract_months_range("6月〜8月")).to contain_exactly 6, 7, 8
      end
      it "引数の期間が年を跨ぐ場合も、数字に展開されること" do
        expect(WorldView.extract_months_range("12月〜2月")).to contain_exactly 1, 2, 12
      end
      it "引数の期間が複数存在する場合も、数字に展開されること" do
        expect(WorldView.extract_months_range("3月〜5月 or 9月〜11月")).to contain_exactly 3, 4, 5, 9, 10, 11
      end
    end
  end

  describe "scope test" do
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

      it "引数の配列内に含まれる名前のCategoryモデルと関連付けされたレコードを返されること" do
        expect(WorldView.filter_by_category_name([category1.name])).to contain_exactly world_view1
        expect(WorldView.filter_by_category_name([category2.name])).to contain_exactly world_view1, world_view2
        expect(WorldView.filter_by_category_name([category1.name, category2.name])).to contain_exactly world_view1, world_view2
      end

      it "返されるレコードが重複しないこと" do
        result = WorldView.filter_by_category_name([category1.name, category2.name])
        expect(result).to eq result.distinct
      end

      it "引数がnilの場合はレコードが全件返されること" do
        world_view3 = create(:world_view)
        expect(WorldView.filter_by_category_name(nil)).to contain_exactly world_view1, world_view2, world_view3
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

      it "引数の配列内に含まれる名前のCountryモデルと関連付けされたレコードを返されること" do
        expect(WorldView.filter_by_country_name([country1.name])).to contain_exactly world_view1
        expect(WorldView.filter_by_country_name([country2.name])).to contain_exactly world_view1, world_view2
        expect(WorldView.filter_by_country_name([country1.name, country2.name])).to contain_exactly world_view1, world_view2
      end

      it "返されるレコードが重複しないこと" do
        result = WorldView.filter_by_country_name([country1.name, country2.name])
        expect(result).to eq result.distinct
      end

      it "引数がnilの場合はレコードが全件返されること" do
        world_view3 = create(:world_view)
        expect(WorldView.filter_by_country_name(nil)).to contain_exactly world_view1, world_view2, world_view3
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

      it "引数の配列内に含まれる名前のCharacteristicモデルと関連付けされたレコードを返されること" do
        expect(WorldView.filter_by_characteristic_name([characteristic1.name])).to contain_exactly world_view1
        expect(WorldView.filter_by_characteristic_name([characteristic2.name])).to contain_exactly world_view1, world_view2
        expect(WorldView.filter_by_characteristic_name([characteristic1.name, characteristic2.name])).to contain_exactly world_view1, world_view2
      end

      it "返されるレコードが重複しないこと" do
        result = WorldView.filter_by_characteristic_name([characteristic1.name, characteristic2.name])
        expect(result).to eq result.distinct
      end

      it "引数がnilの場合はレコードが全件返されること" do
        world_view3 = create(:world_view)
        expect(WorldView.filter_by_characteristic_name(nil)).to contain_exactly world_view1, world_view2, world_view3
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

      it "risk_levelが引数に一致するCountryモデルと関連づけされたレコードが返されること" do
        expect(WorldView.filter_by_country_risk_level("1")).to contain_exactly world_view1
        expect(WorldView.filter_by_country_risk_level("2")).to contain_exactly world_view2
      end

      it "返されるレコードが重複しないこと" do
        result = WorldView.filter_by_country_risk_level("1")
        expect(result).to eq result.distinct
      end

      it "引数がnilの場合はレコードが全件返されること" do
        world_view3 = create(:world_view)
        expect(WorldView.filter_by_country_risk_level(nil)).to contain_exactly world_view1, world_view2, world_view3
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

      it "名前が引数のkeywordに部分一致するレコードが返されること" do
        expect(WorldView.filter_by_keyword("ワシントン")).to contain_exactly world_view1
        expect(WorldView.filter_by_keyword("ロッキー")).to contain_exactly world_view2
      end

      it "国名が引数のkeywordに部分一致するCountryモデルと関連づけされたレコードが返されること" do
        expect(WorldView.filter_by_keyword("アメリカ")).to contain_exactly world_view1, world_view2
      end

      it "返されるレコードが重複しないこと" do
        result = WorldView.filter_by_keyword("アメリカ")
        expect(result).to eq result.distinct
      end

      it "引数のkeywordが空文字である場合、レコードが全件返されること" do
        world_view3 = create(:world_view)
        expect(WorldView.filter_by_keyword("")).to contain_exactly world_view1, world_view2, world_view3
      end
    end

    describe ".filter_by_month" do
      let!(:world_view1) { create(:world_view, best_season: "2月〜6月") }
      let!(:world_view2) { create(:world_view, best_season: "4月〜6月 or 8月〜12月") }
      let!(:world_view3) { create(:world_view, best_season: "9月〜1月") }

      it "best_seasonが引数のmonth_rangeの範囲内のレコードが返されること" do
        expect(WorldView.filter_by_month(["1", "4"])).to contain_exactly world_view1, world_view2, world_view3
        expect(WorldView.filter_by_month(["5", "8"])).to contain_exactly world_view1, world_view2
        expect(WorldView.filter_by_month(["9", "12"])).to contain_exactly world_view2, world_view3
      end

      it "month_rangeが['1', '12']である場合はレコードが全件返されること" do
        expect(WorldView.filter_by_month(["1", "12"])).to contain_exactly world_view1, world_view2, world_view3
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

      it "bmiが引数のbmi_rangeの範囲内のCountryモデルと関連づけされたレコードが返されること" do
        expect(WorldView.filter_by_country_bmi(["0", "10"])).to contain_exactly world_view1
        expect(WorldView.filter_by_country_bmi(["10", "20"])).to contain_exactly world_view1, world_view2
        expect(WorldView.filter_by_country_bmi(["0", "20"])).to contain_exactly world_view1, world_view2
      end

      it "返されるレコードが重複しないこと" do
        result = WorldView.filter_by_country_bmi(["0", "20"])
        expect(result).to eq result.distinct
      end

      it "bmi_rangeが['-40', '30']である場合レコードが全件返されること" do
        world_view3 = create(:world_view)
        expect(WorldView.filter_by_country_bmi(["-40", "30"])).to contain_exactly world_view1, world_view2, world_view3
      end
    end

    describe ".sort_by_latest" do
      let!(:world_view1) { create(:world_view, created_at: 3.days.ago) }
      let!(:world_view2) { create(:world_view, created_at: 2.days.ago) }
      let!(:world_view3) { create(:world_view, created_at: 1.day.ago) }

      it "新しい順にレコードが返されること" do
        expect(WorldView.sort_by_latest).to eq [world_view3, world_view2, world_view1]
      end
    end

    describe ".sort_by_country_bmi" do
      let!(:world_view1) {  create(:world_view) }
      let!(:world_view2) {  create(:world_view) }
      let!(:world_view3) {  create(:world_view) }

      before do
        create(:world_view_country, world_view: world_view1, country: create(:country, bmi: 15.0))
        create(:world_view_country, world_view: world_view2, country: create(:country, bmi: 1.0))
        create(:world_view_country, world_view: world_view3, country: create(:country, bmi: -20.5))
      end

      it "関連のCountryのBMIの値が低い順にレコードが返されること" do
        expect(WorldView.sort_by_country_bmi).to eq [world_view3, world_view2, world_view1]
      end

      it "返されるレコードが重複している場合はBMI値の低いCountryモデルと関連付いたレコードが返されること" do
        create(:world_view_country, world_view: world_view1, country: create(:country, bmi: -40.0))
        expect(WorldView.sort_by_country_bmi).to eq [world_view1, world_view3, world_view2]
      end
    end

    describe ".sort_by_country_risk_level" do
      let!(:world_view1) {  create(:world_view) }
      let!(:world_view2) {  create(:world_view) }
      let!(:world_view3) {  create(:world_view) }

      before do
        create(:world_view_country, world_view: world_view1, country: create(:country, risk_level: 3))
        create(:world_view_country, world_view: world_view2, country: create(:country, risk_level: 2))
        create(:world_view_country, world_view: world_view3, country: create(:country, risk_level: 1))
      end

      it "関連のCountryモデルのrisk_levelの値が低い順にレコードが返されること" do
        expect(WorldView.sort_by_country_risk_level).to eq [world_view3, world_view2, world_view1]
      end

      it "返されるレコードが重複している場合はリスクレベルの低いCountryモデルと関連付いたレコードが返されること" do
        create(:world_view_country, world_view: world_view1, country: create(:country, risk_level: 0))
        expect(WorldView.sort_by_country_risk_level).to eq [world_view1, world_view3, world_view2]
      end
    end

    describe ".sort_by_favorite_count" do
      let!(:world_view1) {  create(:world_view) }
      let!(:world_view2) {  create(:world_view) }
      let!(:world_view3) {  create(:world_view) }

      before do
        create(:world_view_favorite, world_view: world_view2, user: create(:user))
        create(:world_view_favorite, world_view: world_view3, user: create(:user))
        create(:world_view_favorite, world_view: world_view3, user: create(:user))
      end

      it "いいねの数が多い順にレコードが返されること" do
        expect(WorldView.sort_by_favorite_count).to eq [world_view3, world_view2, world_view1]
      end
    end
  end
end
