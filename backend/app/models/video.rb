class Video < ApplicationRecord
  has_many :world_view_videos, dependent: :destroy
  has_many :world_views, through: :world_view_videos
  has_many :video_genres, dependent: :destroy
  has_many :genres, through: :video_genres

  validates :title, presence: true, uniqueness: true
  validates :poster_path, presence: true
  validates :popularity, presence: true
  validates :vote_average, presence: true
  validates :release_date, presence: true

  scope :sort_by_popularity, lambda {
    order(popularity: :desc)
  }

  scope :sort_by_vote_average, lambda {
    order(vote_average: :desc)
  }

  scope :sort_by_release_date, lambda {
    order(release_date: :desc)
  }
end
