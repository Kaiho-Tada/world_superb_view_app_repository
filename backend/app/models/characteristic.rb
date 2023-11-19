class Characteristic < ApplicationRecord
  has_many :superb_view_characteristics, dependent: :destroy
  has_many :superb_views, through: :superb_view_characteristics

  validates :name, length: { maximum: 30 }, presence: true

  scope :filter_by_name, lambda { |names|
    where(name: [*names])
  }
end
