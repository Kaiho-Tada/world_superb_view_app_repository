FactoryBot.define do
  factory :state do
    sequence(:name) { |n| "state_name#{n}" }
    sequence(:code) { |n| "state_code#{n}" }
    portrait        { Rack::Test::UploadedFile.new("spec/fixtures/images/test_image.jpeg", "image/jpeg") }
  end
end
