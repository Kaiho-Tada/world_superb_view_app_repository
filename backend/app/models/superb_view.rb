class SuperbView < ApplicationRecord
  include Rails.application.routes.url_helpers
  has_one_attached :portrait
  has_many :superb_view_countries, dependent: :destroy
  has_many :countries, through: :superb_view_countries
  has_many :superb_view_categories, dependent: :destroy
  has_many :categories, through: :superb_view_categories
  has_many :superb_view_characteristics, dependent: :destroy
  has_many :characteristics, through: :superb_view_characteristics

  validates :name, length: { maximum: 30 }, presence: true
  validates :panorama_url, presence: true
  validates :best_season, length: { maximum: 30 }, presence: true
  validate :validate_image

  def validate_image
    return unless portrait.attached? == false

    errors.add(:portrait, "が存在しません")
  end

  def image_url
    url_for(portrait)
  end
end
