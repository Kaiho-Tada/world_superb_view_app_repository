class Category < ApplicationRecord
  has_many :world_view_categories, dependent: :destroy
  has_many :world_views, through: :world_view_categories

  validates :name, length: { maximum: 30 }, presence: true
  validates :classification, length: { maximum: 30 }, presence: true

  alias_attribute :parent, :classification

  scope :filter_by_name, lambda { |names|
    where(name: [*names])
  }
end
