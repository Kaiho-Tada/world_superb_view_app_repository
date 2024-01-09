class WorldViewFavorite < ApplicationRecord
  belongs_to :world_view
  belongs_to :user

  validates :world_view_id, uniqueness: { scope: :user_id }
end
