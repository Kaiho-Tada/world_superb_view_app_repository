class Genre < ApplicationRecord
  has_many :video_genres, dependent: :destroy
  has_many :videos, through: :video_genres

  validates :name, presence: true
  validates :name, uniqueness: true
end
