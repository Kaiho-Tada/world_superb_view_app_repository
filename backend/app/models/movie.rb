class Movie < ApplicationRecord
  has_many :world_view_movies, dependent: :destroy
  has_many :world_views, through: :world_view_movies

  validates :title, presence: true
  validates :poster_path, presence: true
  validates :budget, presence: true
  validates :revenue, presence: true
  validates :popularity, presence: true
  validates :vote_average, presence: true
  validates :release_date, presence: true
  validates :status, presence: true
end
