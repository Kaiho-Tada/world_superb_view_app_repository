FactoryBot.define do
  factory :world_view do
    sequence(:name)              { |n| "world_view_name#{n}" }
    sequence(:panorama_url)      { |n| "world_view_panorama_url#{n}" }
    sequence(:best_season)       { |n| "world_view_best_season#{n}" }
    portrait                     { Rack::Test::UploadedFile.new("spec/fixtures/images/test_image.jpeg", "image/jpeg") }
  end
end
