require "rails_helper"

RSpec.describe Category, type: :model do
  describe "バリデーションのテスト" do
    it "name, classificationが存在する場合、有効な状態であること" do
      expect(build(:category)).to be_valid
    end

    context "nameカラム" do
      it "nameがない場合、無効な状態であること" do
        category = build(:category, name: nil)
        category.valid?
        expect(category.errors.full_messages).to eq ["カテゴリー名を入力してください"]
      end

      it "nameは30文字以内であること" do
        category = build(:category, name: "a" * 31)
        category.valid?
        expect(category.errors.full_messages).to eq ["カテゴリー名は30文字以内で入力してください"]
      end
    end

    context "classificationカラム" do
      it "classificationがない場合、無効な状態であること" do
        category = build(:category, classification: nil)
        category.valid?
        expect(category.errors.full_messages).to eq ["分類名を入力してください"]
      end

      it "classificationは30文字以内であること" do
        category = build(:category, classification: "a" * 31)
        category.valid?
        expect(category.errors.full_messages).to eq ["分類名は30文字以内で入力してください"]
      end
    end
  end

  describe "スコープテスト" do
    it "filter_by_nameスコープのテスト" do
      category1 = create(:category, name: "滝")
      category2 = create(:category, name: "砂漠")
      expect(Category.filter_by_name(["滝"])).to include(category1)
      expect(Category.filter_by_name(["砂漠"])).to include(category2)
      expect(Category.filter_by_name(["滝", "砂漠"])).to include(category2)
    end
  end
end
