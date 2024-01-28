FactoryBot.define do
  factory :movie do
    sequence(:title) { |n| "title#{n}" }
    poster_path      { "poster_path" }
    homepage         { "homepage" }
    budget           { 1 }
    revenue          { 1 }
    popularity       { 1 }
    vote_average     { 1 }
    release_date     { "release_date" }
    status           { "status" }
    overview         { "overview" }
  end
end
