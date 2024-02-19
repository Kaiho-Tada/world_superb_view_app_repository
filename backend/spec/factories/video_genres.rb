FactoryBot.define do
  factory :video_genre do
    association :video
    association :genre
  end
end
