require "rails_helper"

RSpec.describe Characteristic, type: :model do
  describe "association test" do
    it { is_expected.to have_many(:world_view_characteristics).dependent(:destroy) }
    it { is_expected.to have_many(:world_views).through(:world_view_characteristics) }
  end

  describe "validation test" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_length_of(:name).is_at_most(30) }
  end

  describe "scope test" do
    describe ".filter_by_nameスコープのテスト" do
      let!(:characteristic1) { create(:characteristic) }
      let!(:characteristic2) { create(:characteristic) }

      it "引数の配列内に含まれる名前のレコードが返されること" do
        expect(Characteristic.filter_by_name([characteristic1.name])).to contain_exactly characteristic1
        expect(Characteristic.filter_by_name([characteristic2.name])).to contain_exactly characteristic2
        expect(Characteristic.filter_by_name([characteristic1.name, characteristic2.name])).to contain_exactly characteristic1, characteristic2
      end
    end
  end
end
