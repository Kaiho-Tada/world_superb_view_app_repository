require "rails_helper"

RSpec.describe ErrorUtility do
  describe ".log_and_notify" do
    it "エラーの詳細がログに記録されること" do
      error = StandardError.new("エラーメッセージ")
      allow(Rails.logger).to receive(:error)
      ErrorUtility.log_and_notify(error)
      expect(Rails.logger).to have_received(:error).with(StandardError)
      expect(Rails.logger).to have_received(:error).with("エラーメッセージ")
    end
  end
end
