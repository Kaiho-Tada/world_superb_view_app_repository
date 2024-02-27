require "rails_helper"

RSpec.describe WorldViewCharacteristic, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:world_view) }
    it { is_expected.to belong_to(:characteristic) }
  end
end
