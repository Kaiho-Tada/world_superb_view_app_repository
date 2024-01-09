class Characteristic < ApplicationRecord
  has_many :world_view_characteristics, dependent: :destroy
  has_many :world_views, through: :world_view_characteristics

  validates :name, length: { maximum: 30 }, presence: true

  scope :filter_by_name, lambda { |names|
    where(name: [*names])
  }
end
