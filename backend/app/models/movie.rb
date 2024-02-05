class Movie < ApplicationRecord
  validates :title, presence: true
  validates :poster_path, presence: true
  validates :budget, presence: true
  validates :revenue, presence: true
  validates :popularity, presence: true
  validates :vote_average, presence: true
  validates :release_date, presence: true
  validates :status, presence: true
end
