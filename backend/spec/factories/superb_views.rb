FactoryBot.define do
  factory :superb_view do
    sequence(:name)              { |n| "superb_view_name#{n}" }
    sequence(:panorama_url)      { |n| "superb_view_panorama_url#{n}" }
    sequence(:best_season)       { |n| "superb_view_best_season#{n}" }
    portrait                     { Rack::Test::UploadedFile.new("spec/fixtures/images/test_image.jpeg", "image/jpeg") }
  end
end
