require "rails_helper"

RSpec.describe WorldViewCharacteristic, type: :model do
  describe "関連のテスト" do
    it "world_viewと正しく関連付けされていること" do
      world_view = create(:world_view)
      world_view_characteristic = create(:world_view_characteristic, world_view:)

      expect(world_view_characteristic.world_view).to eq(world_view)
    end

    it "characteristicと正しく関連付けされていること" do
      characteristic = create(:characteristic)
      world_view_characteristic = create(:world_view_characteristic, characteristic:)

      expect(world_view_characteristic.characteristic).to eq(characteristic)
    end
  end
end
