FactoryBot.define do
  factory :world_view_movie do
    association :world_view
    association :movie
  end
end
