FactoryBot.define do
  factory :video do
    sequence(:title) { |n| "title#{n}" }
    poster_path      { "poster_path" }
    popularity       { 1 }
    vote_average     { 1 }
    release_date     { "release_date" }
    is_movie         { false }
    overview         { "overview" }
  end
end
