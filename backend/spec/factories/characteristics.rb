FactoryBot.define do
  factory :characteristic do
    sequence(:name) { |n| "characteristic_name#{n}" }
  end
end
