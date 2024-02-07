class WorldViewVideo < ApplicationRecord
  belongs_to :world_view
  belongs_to :video

  validates :world_view_id, uniqueness: { scope: :video_id }
end
