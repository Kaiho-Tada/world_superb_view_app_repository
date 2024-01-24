FactoryBot.define do
  factory :country do
    sequence(:name) { |n| "country_name#{n}" }
    sequence(:code) { |n| "country_code#{n}" }
    risk_level      { 1 }
    portrait        { Rack::Test::UploadedFile.new("spec/fixtures/images/test_image.jpeg", "image/jpeg") }
    bmi             { 10.0 }
  end
end
