FactoryBot.define do
  factory :world_view do
    sequence(:name)              { |n| "world_view_name#{n}" }
    sequence(:best_season)       { |n| "world_view_best_season#{n}" }
    latitude                     { 0 }
    longitude                    { 0 }
    portrait                     { Rack::Test::UploadedFile.new("spec/fixtures/images/test_image.jpeg", "image/jpeg") }
  end
end
