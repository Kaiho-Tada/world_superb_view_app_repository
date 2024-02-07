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
end
