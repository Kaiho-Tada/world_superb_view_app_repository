class WorldViewMovie < ApplicationRecord
  belongs_to :world_view
  belongs_to :movie

  validates :world_view_id, uniqueness: { scope: :movie_id }
end
