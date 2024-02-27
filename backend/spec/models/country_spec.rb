require "rails_helper"

RSpec.describe Country, type: :model do
  describe "association test" do
    it { is_expected.to have_many(:world_view_countries).dependent(:destroy) }
    it { is_expected.to have_many(:world_views).through(:world_view_countries) }
  end

  describe "validation test" do
    subject { create(:country) }
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_length_of(:name).is_at_most(30) }
    it { is_expected.to validate_presence_of(:code) }
    it { is_expected.to validate_length_of(:code).is_at_most(30) }
    it { is_expected.to validate_presence_of(:region) }
  end

  describe "alias test" do
    it "parentはregionのエイリアスであること" do
      country = Country.new(region: "アフリカ")
      expect(country.parent).to eq("アフリカ")
    end
  end

  describe "method test" do
    let!(:country) { create(:country) }

    it "image_urlメソッドで生成されるurlが意図した形式であること" do
      expect(country.image_url).to match(%r{http://localhost:3001/rails/active_storage/blobs/redirect/.+/test_image.jpeg})
    end
  end

  describe "scope test" do
    describe ".filter_by_nameスコープのテスト" do
      let!(:country1) { create(:country) }
      let!(:country2) { create(:country) }

      it "引数の配列内に含まれる名前のレコードが返されること" do
        expect(Country.filter_by_name([country1.name])).to contain_exactly country1
        expect(Country.filter_by_name([country2.name])).to contain_exactly country2
        expect(Country.filter_by_name([country1.name, country2.name])).to  contain_exactly country1, country2
      end

      it "引数がnilである場合、レコードが全件返されること" do
        country3 = create(:country)
        expect(Country.filter_by_name(nil)).to contain_exactly country1, country2, country3
      end
    end

    describe ".filter_by_risk_level" do
      let!(:country1) { create(:country, risk_level: 1) }
      let!(:country2) { create(:country, risk_level: 2) }
      let!(:country3) { create(:country, risk_level: 3) }

      it "引数のrisk_levelであるレコードが返されること" do
        expect(Country.filter_by_risk_level("1")).to contain_exactly country1
        expect(Country.filter_by_risk_level("2")).to contain_exactly country2
        expect(Country.filter_by_risk_level("3")).to contain_exactly country3
      end

      it "引数がnilの場合はレコードが全件返されること" do
        expect(Country.filter_by_risk_level(nil)).to contain_exactly country1, country2, country3
      end
    end

    describe ".filter_by_bmi" do
      let!(:country1) { create(:country, bmi: 5.0) }
      let!(:country2) { create(:country, bmi: -5.0) }

      it "引数のbmi_rangeの範囲内のレコードが返されること" do
        expect(Country.filter_by_bmi(["0", "10"])).to contain_exactly country1
        expect(Country.filter_by_bmi(["-10", "0"])).to contain_exactly country2
        expect(Country.filter_by_bmi(["-10", "10"])).to contain_exactly country1, country2
      end

      it "引数がnilである場合、レコードが全件返されること" do
        country3 = create(:country)
        expect(Country.filter_by_bmi(nil)).to contain_exactly country1, country2, country3
      end
    end
  end
end
