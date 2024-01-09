FactoryBot.define do
  factory :world_view_favorite do
    association :world_view
    association :user
  end
end
