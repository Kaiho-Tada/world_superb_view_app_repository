require "rails_helper"

RSpec.describe Characteristic, type: :model do
  describe "バリデーションのテスト" do
    it "nameが存在する場合、有効な状態であること" do
      expect(build(:characteristic)).to be_valid
    end

    context "nameカラム" do
      it "nameが無い場合、無効な状態であること" do
        characteristic = build(:characteristic, name: nil)
        characteristic.valid?
        expect(characteristic.errors.full_messages).to eq ["属性名を入力してください"]
      end

      it "nameは30文字以内であること" do
        characteristic = build(:characteristic, name: "a" * 31)
        characteristic.valid?
        expect(characteristic.errors.full_messages).to eq ["属性名は30文字以内で入力してください"]
      end
    end
  end

  describe "スコープテスト" do
    it "filter_by_nameスコープのテスト" do
      characteristic1 = create(:characteristic, name: "雄大")
      characteristic2 = create(:characteristic, name: "畏怖")
      expect(Characteristic.filter_by_name(["雄大"])).to include(characteristic1)
      expect(Characteristic.filter_by_name(["畏怖"])).to include(characteristic2)
      expect(Characteristic.filter_by_name(["雄大", "畏怖"])).to include(characteristic1, characteristic2)
    end
  end
end
