FactoryBot.define do
  factory :category do
    sequence(:name) { |n| "category_name#{n}" }
    classification { "自然" }
  end
end
