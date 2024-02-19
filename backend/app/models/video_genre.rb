class VideoGenre < ApplicationRecord
  belongs_to :video
  belongs_to :genre

  validates :video_id, uniqueness: { scope: :genre_id }
end
