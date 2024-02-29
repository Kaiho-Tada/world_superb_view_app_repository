require "rails_helper"

RSpec.describe Category, type: :model do
  describe "association test" do
    it { is_expected.to have_many(:world_view_categories).dependent(:destroy) }
    it { is_expected.to have_many(:world_views).through(:world_view_categories) }
  end

  describe "validation test" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_length_of(:name).is_at_most(30) }
    it { is_expected.to validate_presence_of(:classification) }
    it { is_expected.to validate_length_of(:classification).is_at_most(30) }
  end

  describe "alias test" do
    it "parentはclassificationのエイリアスであること" do
      category = Category.new(classification: "自然")
      expect(category.parent).to eq("自然")
    end
  end

  describe "scope test" do
    describe ".filter_by_nameスコープのテスト" do
      let!(:category1) { create(:category) }
      let!(:category2) { create(:category) }

      it "引数の配列内に含まれる名前のレコードが返されること" do
        expect(Category.filter_by_name([category1.name])).to contain_exactly category1
        expect(Category.filter_by_name([category2.name])).to contain_exactly category2
        expect(Category.filter_by_name([category1.name, category2.name])).to contain_exactly category1, category2
      end
    end
  end
end
