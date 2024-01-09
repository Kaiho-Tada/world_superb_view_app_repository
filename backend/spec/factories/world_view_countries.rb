FactoryBot.define do
  factory :world_view_country do
    association :world_view
    association :country
  end
end
