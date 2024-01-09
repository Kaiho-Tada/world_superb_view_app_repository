class WorldViewCountry < ApplicationRecord
  belongs_to :world_view
  belongs_to :country
end
