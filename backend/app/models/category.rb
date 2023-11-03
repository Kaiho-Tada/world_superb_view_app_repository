class Category < ApplicationRecord
  has_many :superb_view_categories, dependent: :destroy
  has_many :superb_views, through: :superb_view_categories

  validates :name, length: { maximum: 30 }, presence: true
  validates :classification, length: { maximum: 30 }, presence: true
end
